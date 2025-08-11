'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import {
  useForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  AccountTypeEnum,
} from '@graphql/generated';

export const useForgotPassword = () => {
  const t = useTranslations('Login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Schema validation based on backend value objects
  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: t('invalidEmailFormat') }),
  });

  const [forgotPasswordMutation] = useForgotPasswordMutation();

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate email format
      const validatedData = forgotPasswordSchema.parse({ email });

      const variables: ForgotPasswordMutationVariables = {
        email: validatedData.email,
        accountType: AccountTypeEnum.Tenant,
      };

      const { data } = await forgotPasswordMutation({ variables });

      if (data?.forgotPassword.success) {
        return { success: true, message: data.forgotPassword.message };
      } else {
        setError(data?.forgotPassword.message || 'Failed to send reset email');
        return { success: false, message: data?.forgotPassword.message };
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0]?.message || 'Invalid email format';
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
    handleForgotPassword,
    isLoading,
    error,
    forgotPasswordSchema,
  };
};

export default useForgotPassword;
