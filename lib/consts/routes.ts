// Public routes that don't require authentication
export const PublicRoutes = [
  '/',
  '/login',
  '/register',
  '/terms',
  '/privacy',
  '/touch',
  '/variant',
  '/contact',
] as const;

// Helper function to check if a route is public
export const isPublicRoute = (pathname: string): boolean => {
  // Remove locale prefix if present (e.g., /en/login -> /login)
  const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  return PublicRoutes.some((route) => {
    if (route === '/') {
      return cleanPath === '/';
    }
    return cleanPath.startsWith(route);
  });
};

// Helper function to check if a route requires authentication
export const isProtectedRoute = (pathname: string): boolean => {
  return !isPublicRoute(pathname);
};
