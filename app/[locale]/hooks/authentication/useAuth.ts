'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@i18n/navigation';

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

  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        // TO DO: Send request to validate token
        setAuthState({
          isAuthenticated: !!accessToken,
          isLoading: false,
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const redirectToLogin = () => {
    router.push('/login');
  };

  return {
    ...authState,
    redirectToLogin,
  };
};

export default useAuth;
