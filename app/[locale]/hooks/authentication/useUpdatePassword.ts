'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import {
  useUpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from '@graphql/generated';

export const useUpdatePassword = () => {
  const t = useTranslations('ResetPassword');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Schema validation based on backend value objects
  const updatePasswordSchema = z
    .object({
      token: z.string().min(1, { message: t('tokenRequired') }),
      password: z
        .string()
        .min(8, { message: t('passwordTooShort') })
        .max(255, { message: t('passwordTooLong') }),
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
  ) => {
    setIsLoading(true);
    setError(null);

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

      const { data } = await updatePasswordMutation({ variables });

      if (data?.updatePassword.success) {
        return { success: true, message: data.updatePassword.message };
      } else {
        setError(data?.updatePassword.message || 'Failed to update password');
        return { success: false, message: data?.updatePassword.message };
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0]?.message || 'Validation error';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdatePassword,
    isLoading,
    error,
    updatePasswordSchema,
  };
};

export default useUpdatePassword;
