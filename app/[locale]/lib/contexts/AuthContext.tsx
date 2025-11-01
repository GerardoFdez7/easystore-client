'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { usePathname, useRouter } from '@i18n/navigation';
import { useQuery } from '@apollo/client/react';
import {
  ValidateTokenDocument,
  ValidateTokenQuery,
  FindTenantAuthInfoDocument,
  FindTenantAuthInfoQuery,
} from '@graphql/generated';
import { isProtectedRoute } from '@lib/consts/routes';

interface TenantData {
  ownerName: string;
  businessName?: string;
  logo?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  tenantData: TenantData | null;
  tenantLoading: boolean;
}

interface AuthContextType extends AuthState {
  redirectToLogin: () => void;
  checkAuth: () => Promise<boolean>;
  refreshTenantData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  fallback,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    tenantData: null,
    tenantLoading: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  // Validate token query
  const {
    data: validateData,
    error: validateError,
    loading: validateLoading,
    refetch: refetchValidation,
  } = useQuery<ValidateTokenQuery>(ValidateTokenDocument, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    pollInterval: 300000, // Revalidate token every 5 minutes
  });

  // Tenant data query - only fetch when authenticated
  const {
    data: tenantData,
    loading: tenantLoading,
    refetch: refetchTenant,
  } = useQuery<FindTenantAuthInfoQuery>(FindTenantAuthInfoDocument, {
    skip: !authState.isAuthenticated,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const checkAuth = async (): Promise<boolean> => {
    try {
      const result = await refetchValidation();
      const isAuthenticated = result.data?.validateToken?.success || false;

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated,
        loading: false,
      }));

      return isAuthenticated;
    } catch (_error) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        loading: false,
      }));
      return false;
    }
  };

  const refreshTenantData = () => {
    if (authState.isAuthenticated) {
      void refetchTenant();
    }
  };

  const redirectToLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  // Update auth state when validation data changes
  useEffect(() => {
    if (!validateLoading) {
      const isAuthenticated = validateData?.validateToken?.success || false;
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated,
        loading: false,
      }));
    }
  }, [validateData, validateLoading, validateError]);

  // Update tenant data when it changes
  useEffect(() => {
    if (tenantData?.getTenantById) {
      const tenant = tenantData.getTenantById;
      setAuthState((prev) => ({
        ...prev,
        tenantData: {
          ownerName: tenant.ownerName,
          businessName: tenant.businessName || undefined,
          logo: tenant.logo || undefined,
        },
        tenantLoading,
      }));
    } else {
      setAuthState((prev) => ({
        ...prev,
        tenantLoading,
      }));
    }
  }, [tenantData, tenantLoading]);

  // Handle route protection
  useEffect(() => {
    if (
      isProtectedRoute(pathname) &&
      !authState.loading &&
      !authState.isAuthenticated
    ) {
      redirectToLogin();
    }
  }, [authState.isAuthenticated, authState.loading, pathname, redirectToLogin]);

  // Show loading state while checking authentication
  if (authState.loading) {
    return <>{fallback}</>;
  }

  // For protected routes, only render children if authenticated
  if (isProtectedRoute(pathname) && !authState.isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const contextValue: AuthContextType = {
    ...authState,
    redirectToLogin,
    checkAuth,
    refreshTenantData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
