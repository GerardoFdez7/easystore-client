'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const updatePasswordMutation = gql`
  mutation updatePassword($token: String!, $password: String!) {
    updatePassword(input: { token: $token, password: $password }) {
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
  token: string;
  password: string;
}

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [updatePassword] = useMutation<UpdatePasswordData, UpdatePasswordVars>(
    updatePasswordMutation,
  );

  const handleUpdatePassword = async (token: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await updatePassword({
        variables: {
          token,
          password,
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
