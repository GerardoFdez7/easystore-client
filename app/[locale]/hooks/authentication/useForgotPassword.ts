'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  useForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  AccountTypeEnum,
} from '@graphql/generated';

export const useForgotPassword = () => {
  const t = useTranslations('ForgotPassword');
  const [isLoading, setIsLoading] = useState(false);

  // Schema validation based on backend value objects
  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: t('invalidEmailFormat') }),
  });

  const [forgotPasswordMutation] = useForgotPasswordMutation();

  const handleForgotPassword = async (
    email: string,
  ): Promise<{ success: boolean }> => {
    setIsLoading(true);

    try {
      // Validate email format
      const validatedData = forgotPasswordSchema.parse({ email });

      const variables: ForgotPasswordMutationVariables = {
        email: validatedData.email,
        accountType: AccountTypeEnum.Tenant,
      };

      const result = await forgotPasswordMutation({ variables });

      if (result.data?.forgotPassword.success) {
        toast.success(t('resetEmailSent'), {
          description: t('resetEmailSentDescription'),
        });
        return { success: true };
      } else {
        toast.error(t('resetEmailFailed'), {
          description:
            result.data?.forgotPassword.message ||
            t('resetEmailFailedDescription'),
        });
        return { success: false };
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0]?.message || t('invalidEmailFormat');
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
    handleForgotPassword,
    isLoading,
    forgotPasswordSchema,
  };
};

export default useForgotPassword;
