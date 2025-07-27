# Authentication System

This document describes the authentication system implemented in the EasyStore Web application.

## Overview

The authentication system provides global protection for the application with a whitelist approach for public routes. By default, all routes require authentication except those explicitly marked as public.

## Components

### 1. useAuth Hook (`@hooks/authentication/useAuth`)

Provides authentication state and methods:

```typescript
const { isAuthenticated, isLoading, redirectToLogin } = useAuth();
```

**Features:**

- Checks sessionStorage for access tokens
- Listens for storage changes (multi-tab logout)
- Handles redirects and logout

### 2. ProtectedRoute Component (`@atoms/shared/ProtectedRoute`)

Global authentication wrapper that:

- Automatically redirects unauthenticated users from protected routes
- Shows loading state during authentication checks
- Allows public routes to render without authentication

### 3. AuthGuard Component (`@atoms/shared/AuthGuard`)

Optional component for fine-grained control:

- Use when you need specific authentication behavior
- Can show/hide content based on auth status
- Provides custom fallback rendering

### 4. Route Configuration (`@consts/routes`)

Defines which routes are public vs protected:

```typescript
// Public routes (no authentication required)
export const PublicRoutes = [
  '/',
  '/login',
  '/register',
];

// Helper functions
export const isPublicRoute = (pathname: string): boolean => { ... }
export const isProtectedRoute = (pathname: string): boolean => { ... }
```

## Implementation

### Global Protection

The system is implemented at the layout level (`app/[locale]/layout.tsx`):

```tsx
<ProtectedRoute>{children}</ProtectedRoute>
```

This provides automatic protection for all routes except those in `PublicRoutes`.

### Adding New Routes

**For Public Routes:**
Add to `PublicRoutes` array in `@consts/routes`:

```typescript
export const PublicRoutes = [
  '/',
  '/login',
  '/register',
  '/new-public-route', // Add here
] as const;
```

**For Protected Routes:**
No action needed - all routes are protected by default.

### Component-Level Authentication

For specific components that need authentication control:

```tsx
import AuthGuard from '@atoms/shared/AuthGuard';

// Show content only to authenticated users
<AuthGuard>
  <ProtectedContent />
</AuthGuard>

// Show content only to unauthenticated users
<AuthGuard requireAuth={false}>
  <PublicOnlyContent />
</AuthGuard>

// With custom fallback
<AuthGuard fallback={<LoginPrompt />}>
  <ProtectedContent />
</AuthGuard>
```

## Token Management

The system uses sessionStorage for token storage:

- `accessToken`: Main authentication token
- `userId`: User identifier

And HttpOnly secure Cookie for `refreshToken`

## Future Enhancements

1. **Server-Side Validation**: Add API calls to validate tokens
2. **Token Refresh**: Implement automatic token refresh
3. **Role-Based Access**: Add user roles and permissions
4. **Session Management**: Add session timeout handling
5. **Remember Me**: Add persistent login option

## Testing Authentication

1. **Unauthenticated Access**: Visit `/dashboard` without tokens → should redirect to `/login`
2. **Authenticated Access**: Login and visit `/dashboard` → should show content
3. **Public Routes**: Visit `/`, `/login`, `/register` → should work without authentication
4. **Multi-Tab Logout**: Logout in one tab → other tabs should detect and redirect
