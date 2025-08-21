'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  ForgotPasswordDocument,
  ForgotPasswordMutationVariables,
  ForgotPasswordMutation,
  AccountTypeEnum,
} from '@graphql/generated';
import useMutation from '../../useMutation';

export const useForgotPassword = () => {
  const t = useTranslations('ForgotPassword');
  const [isLoading, setIsLoading] = useState(false);

  // Schema validation based on backend value objects
  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: t('invalidEmailFormat') }),
  });

  const { mutate: forgotPasswordMutation } = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);

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

      await forgotPasswordMutation({ variables });

      // Always show generic success message for security reasons
      // regardless of whether the email exists or not
      toast.success(t('resetEmailSent'), {
        description: t('resetEmailSentDescription'),
      });
      return { success: true };
    } catch (_err) {
      toast.error(t('unexpectedError'), {
        description: t('unexpectedErrorDescription'),
      });
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
