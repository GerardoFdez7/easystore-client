'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  useUpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from '@graphql/generated';

export const useUpdatePassword = () => {
  const t = useTranslations('ResetPassword');
  const [isLoading, setIsLoading] = useState(false);

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
        toast.error(t('passwordUpdateFailed'), {
          description:
            result.data?.updatePassword.message ||
            t('passwordUpdateFailedDescription'),
        });
        return { success: false };
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0]?.message || t('validationError');
        toast.error(t('validationError'), {
          description: errorMessage,
        });
      } else {
        toast.error(t('unexpectedError'), {
          description: t('unexpectedErrorDescription'),
        });
      }
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdatePassword,
    isLoading,
    updatePasswordSchema,
  };
};

export default useUpdatePassword;
