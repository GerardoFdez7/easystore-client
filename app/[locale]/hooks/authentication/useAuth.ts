'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@i18n/navigation';
import { useValidateTokenQuery } from '@graphql/generated';

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

  // Use the generated query hook
  const { data, error, loading, refetch } = useValidateTokenQuery({
    fetchPolicy: 'network-only', // Always check with server
    errorPolicy: 'none', // Don't cache errors
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
    if (!loading) {
      const isAuthenticated = data?.validateToken?.success || false;
      setAuthState({
        isAuthenticated,
        isLoading: false,
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
