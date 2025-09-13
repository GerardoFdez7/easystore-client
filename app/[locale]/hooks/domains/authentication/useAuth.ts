'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@i18n/navigation';
import { ValidateTokenDocument, ValidateTokenQuery } from '@graphql/generated';
import { useQuery } from '@apollo/client/react';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
  });
  const router = useRouter();

  // Use the GraphQL queries hook
  const { data, error, loading, refetch } = useQuery<ValidateTokenQuery>(
    ValidateTokenDocument,
    {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
  );

  const checkAuth = async () => {
    try {
      const result = await refetch();
      const isAuthenticated = result.data?.validateToken?.success || false;

      setAuthState({
        isAuthenticated,
        loading: false,
      });

      return isAuthenticated;
    } catch (_error) {
      setAuthState({
        isAuthenticated: false,
        loading: false,
      });
      return false;
    }
  };

  useEffect(() => {
    if (!loading) {
      const isAuthenticated = data?.validateToken?.success || false;
      setAuthState({
        isAuthenticated,
        loading: false,
      });
    }
  }, [data, loading, error]);

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
