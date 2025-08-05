'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@i18n/navigation';
import { useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client';

const validateToken = gql`
  query validateToken {
    validateToken {
      success
      message
    }
  }
`;

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();
  const client = useApolloClient();

  const checkAuth = async () => {
    try {
      const { data } = await client.query({
        query: validateToken,
        fetchPolicy: 'network-only', // Always check with server
        errorPolicy: 'none', // Don't cache errors
      });

      const isAuthenticated = data?.validateToken?.success || false;

      setAuthState({
        isAuthenticated,
        isLoading: false,
      });

      return isAuthenticated;
    } catch (_error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
      });
      return false;
    }
  };

  useEffect(() => {
    void checkAuth();
  });

  const redirectToLogin = () => {
    router.push('/login');
  };

  return {
    ...authState,
    redirectToLogin,
    checkAuth,
  };
};

export default useAuth;
