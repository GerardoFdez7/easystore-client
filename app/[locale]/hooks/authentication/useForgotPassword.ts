'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AccountTypeEnum } from '@graphql/generated';

const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!, $accountType: AccountTypeEnum!) {
    forgotPassword(input: { email: $email, accountType: $accountType }) {
      success
      message
    }
  }
`;

interface ForgotPasswordData {
  forgotPassword: {
    success: boolean;
    message: string;
  };
}

interface ForgotPasswordVars {
  email: string;
  accountType: AccountTypeEnum;
}

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [forgotPassword] = useMutation<ForgotPasswordData, ForgotPasswordVars>(
    forgotPasswordMutation,
  );

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await forgotPassword({
        variables: {
          email,
          accountType: AccountTypeEnum.Tenant,
        },
      });

      if (data?.forgotPassword.success) {
        return { success: true, message: data.forgotPassword.message };
      } else {
        setError(data?.forgotPassword.message || 'Failed to send reset email');
        return { success: false, message: data?.forgotPassword.message };
      }
    } catch (err) {
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
  };
};

export default useForgotPassword;
