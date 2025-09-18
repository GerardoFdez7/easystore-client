'use client';

import { useEffect } from 'react';
import { usePathname } from '@i18n/navigation';
import { useAuth } from '@hooks/domains/authentication/useAuth';
import { isProtectedRoute } from '@consts/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, redirectToLogin } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Only check authentication for protected routes
    if (isProtectedRoute(pathname) && !loading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, loading, pathname, redirectToLogin]);

  // Show loading state while checking authentication
  if (loading) {
    return fallback;
  }

  // For protected routes, only render children if authenticated
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // For public routes or authenticated users, render children
  return <>{children}</>;
}
