import { useAuth } from '@hooks/domains/authentication/useAuth';
import SpinLoader from '@atoms/shared/SpinLoader';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * AuthGuard component for fine-grained authentication control
 * Use this when you need specific authentication behavior for individual components
 * Note: Global protection is already handled by ProtectedRoute in the layout
 */
export default function AuthGuard({
  children,
  fallback,
  requireAuth = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return fallback || <SpinLoader />;
  }

  if (requireAuth && !isAuthenticated) {
    return fallback || null;
  }

  if (!requireAuth && isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
}
