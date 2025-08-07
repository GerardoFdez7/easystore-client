'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AccountTypeEnum } from '@graphql/generated';

const updatePasswordMutation = gql`
  mutation updatePassword(
    $email: String!
    $password: String!
    $accountType: AccountTypeEnum!
  ) {
    updatePassword(
      input: { email: $email, password: $password, accountType: $accountType }
    ) {
      success
      message
    }
  }
`;

interface UpdatePasswordData {
  updatePassword: {
    success: boolean;
    message: string;
  };
}

interface UpdatePasswordVars {
  email: string;
  password: string;
  accountType: AccountTypeEnum;
}

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [updatePassword] = useMutation<UpdatePasswordData, UpdatePasswordVars>(
    updatePasswordMutation,
  );

  const handleUpdatePassword = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await updatePassword({
        variables: {
          email,
          password,
          accountType: AccountTypeEnum.Tenant,
        },
      });

      if (data?.updatePassword.success) {
        return { success: true, message: data.updatePassword.message };
      } else {
        setError(data?.updatePassword.message || 'Failed to update password');
        return { success: false, message: data?.updatePassword.message };
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
    handleUpdatePassword,
    isLoading,
    error,
  };
};

export default useUpdatePassword;
