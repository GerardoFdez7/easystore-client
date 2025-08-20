'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@i18n/navigation';
import { ValidateTokenDocument, ValidateTokenQuery } from '@graphql/generated';
import useGraphQLQueries from '../../useQueries';

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

  // Use the GraphQL queries hook
  const { data, errors, isLoading, refetch } =
    useGraphQLQueries<ValidateTokenQuery>(ValidateTokenDocument, undefined, {
      fetchPolicy: 'network-only', // Always check with server
      notifyOnNetworkStatusChange: true,
    });

  const checkAuth = async () => {
    try {
      const result = await refetch();
      const isAuthenticated = result.data?.validateToken?.success || false;

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
    if (!isLoading) {
      const isAuthenticated = data?.validateToken?.success || false;
      setAuthState({
        isAuthenticated,
        isLoading: false,
      });
    }
  }, [data, isLoading, errors]);

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
