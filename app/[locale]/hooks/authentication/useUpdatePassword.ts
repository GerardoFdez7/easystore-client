'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod/v4';
import { toast } from 'sonner';
import {
  useUpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from '@graphql/generated';

export const useUpdatePassword = () => {
  const t = useTranslations('ResetPassword');
  const [isLoading, setIsLoading] = useState(false);

  // Base password validation schema
  const passwordSchema = z
    .string()
    .min(8, { message: t('passwordTooShort') })
    .max(255, { message: t('passwordTooLong') });

  // Form schema for react-hook-form (without token)
  const formSchema = z
    .object({
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  // Full schema for API validation (with token)
  const updatePasswordSchema = z
    .object({
      token: z.string().min(1, { message: t('tokenRequired') }),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  const [updatePasswordMutation] = useUpdatePasswordMutation();

  const handleUpdatePassword = async (
    token: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ success: boolean }> => {
    setIsLoading(true);

    try {
      // Validate password requirements and confirmation
      const validatedData = updatePasswordSchema.parse({
        token,
        password,
        confirmPassword,
      });

      const variables: UpdatePasswordMutationVariables = {
        token: validatedData.token,
        password: validatedData.password,
      };

      const result = await updatePasswordMutation({ variables });

      if (result.data?.updatePassword.success) {
        toast.success(t('passwordUpdated'), {
          description: t('passwordUpdatedDescription'),
        });
        return { success: true };
      } else {
        const errorMessage = result.data?.updatePassword.message || '';
        const lowerErrorMessage = errorMessage.toLowerCase();

        // Check if it's a token-related error (invalid/expired)
        if (
          lowerErrorMessage.includes('token') &&
          (lowerErrorMessage.includes('expired') ||
            lowerErrorMessage.includes('invalid'))
        ) {
          // Don't show toast for token errors, let component handle it
          return { success: false };
        } else {
          // Show toast for unexpected errors
          toast.error(t('unexpectedError'), {
            description: t('unexpectedErrorDescription'),
          });
          return { success: false };
        }
      }
    } catch (err: unknown) {
      // Handle GraphQL errors
      if (
        err &&
        typeof err === 'object' &&
        'graphQLErrors' in err &&
        Array.isArray(err.graphQLErrors) &&
        err.graphQLErrors.length > 0
      ) {
        const graphQLError = err.graphQLErrors[0];
        const errorMessage = graphQLError.message.toLowerCase();

        // Check if it's a token-related error (invalid/expired)
        if (
          errorMessage.includes('token') &&
          (errorMessage.includes('expired') || errorMessage.includes('invalid'))
        ) {
          // Don't show toast for token errors, let component handle it
          return { success: false };
        } else {
          // Show toast for unexpected errors
          toast.error(t('unexpectedError'), {
            description: t('unexpectedErrorDescription'),
          });
          return { success: false };
        }
      } else if (err instanceof Error) {
        const errorMessage = err.message.toLowerCase();

        // Check if it's a token-related error (invalid/expired)
        if (
          errorMessage.includes('token') &&
          (errorMessage.includes('expired') || errorMessage.includes('invalid'))
        ) {
          // Don't show toast for token errors, let component handle it
          return { success: false };
        } else {
          // Show toast for unexpected errors
          toast.error(t('unexpectedError'), {
            description: t('unexpectedErrorDescription'),
          });
          return { success: false };
        }
      } else {
        // Show toast for unexpected errors
        toast.error(t('unexpectedError'), {
          description: t('unexpectedErrorDescription'),
        });
        return { success: false };
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdatePassword,
    isLoading,
    formSchema,
    updatePasswordSchema,
  };
};

export default useUpdatePassword;
