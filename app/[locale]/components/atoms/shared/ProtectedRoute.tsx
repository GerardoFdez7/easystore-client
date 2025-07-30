'use client';

import { useEffect } from 'react';
import { usePathname } from '@i18n/navigation';
import { useAuth } from '@hooks/authentication/useAuth';
import { isProtectedRoute } from '@consts/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Only check authentication for protected routes
    if (isProtectedRoute(pathname) && !isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, isLoading, pathname, redirectToLogin]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="border-title h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      )
    );
  }

  // For protected routes, only render children if authenticated
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // For public routes or authenticated users, render children
  return <>{children}</>;
}
