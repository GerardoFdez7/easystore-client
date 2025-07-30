# Authentication System

This document describes the authentication system implemented in the EasyStore Web application.

## Overview

The authentication system provides global protection for the application with a whitelist approach for public routes. By default, all routes require authentication except those explicitly marked as public.

## Components

### 1. useAuth Hook (`@hooks/authentication/useAuth`)

Provides authentication state and methods:

```typescript
const { isAuthenticated, isLoading, redirectToLogin, refreshAuth } = useAuth();
```

**Features:**

- Uses GraphQL `validateToken` query to check authentication with HttpOnly cookies
- Performs server-side authentication validation for enhanced security
- Handles redirects and logout
- Don't relies on client-side token storage

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

The system uses secure HttpOnly cookies for token storage:

- `accessToken`: Main authentication token (HttpOnly, Secure, SameSite)

**Security Benefits:**

- HttpOnly cookies prevent XSS attacks by making tokens inaccessible to JavaScript
- Secure flag ensures cookies are only sent over HTTPS
- SameSite protection against CSRF attacks
- Server-side validation through GraphQL queries

## Authentication Flow

### Login Process

1. User submits credentials via `useLogin` hook
2. GraphQL mutation sends credentials to backend
3. Backend validates credentials and sets HttpOnly cookies
4. User is redirected to dashboard after successful authentication

### Authentication Check

1. `useAuth` hook calls GraphQL `validateToken` query
2. Query automatically includes HttpOnly cookies in request
3. Backend validates token and returns authentication status
4. Frontend updates `isAuthenticated` state accordingly

### Logout Process

1. `useLogout` hook calls GraphQL logout mutation
2. Backend clears HttpOnly cookies
3. Frontend redirects to login page

## Future Enhancements

1. **Token Refresh**: Implement automatic token refresh
2. **Role-Based Access**: Add user roles and permissions
3. **Session Management**: Add session timeout handling
4. **Remember Me**: Add persistent login option

## Testing Authentication

1. **Unauthenticated Access**: Visit `/dashboard` without valid cookies → should redirect to `/login`
2. **Authenticated Access**: Login and visit `/dashboard` → should show content
3. **Public Routes**: Visit `/`, `/login`, `/register` → should work without authentication
4. **Cookie Security**: Check browser dev tools → `accessToken` should be HttpOnly and not accessible via JavaScript
5. **Server Validation**: Authentication state is validated server-side through GraphQL queries
6. **Cross-Tab Behavior**: Authentication state is consistent across browser tabs
