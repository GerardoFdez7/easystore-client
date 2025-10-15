# Authentication System

This document describes the authentication system implemented in the EasyStore Web application.

## Overview

The authentication system provides global protection for the application with a whitelist approach for public routes. By default, all routes require authentication except those explicitly marked as public. The system is built around a centralized `AuthContext` that manages authentication state and tenant data.

## Components

### 1. AuthContext (`@contexts/AuthContext`)

The central authentication context that provides:

```typescript
const {
  isAuthenticated,
  loading,
  tenantData,
  tenantLoading,
  redirectToLogin,
  checkAuth,
  refreshTenantData,
} = useAuth();
```

**Features:**

- Uses GraphQL `validateToken` query to check authentication with HttpOnly cookies
- Performs server-side authentication validation for enhanced security
- Automatically fetches tenant data when authenticated
- Handles route protection internally
- Provides tenant information (owner name, business name, logo)
- Don't relies on client-side token storage

**Tenant Data Structure:**

```typescript
interface TenantData {
  ownerName: string;
  businessName?: string;
  logo?: string;
}
```

### 2. AuthProvider Component

Global authentication wrapper that:

- Automatically redirects unauthenticated users from protected routes
- Shows loading state during authentication checks
- Allows public routes to render without authentication
- Fetches and manages tenant data for authenticated users

### 3. Route Configuration (`@consts/routes`)

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
<AuthProvider>{children}</AuthProvider>
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

Components can access authentication state directly:

```tsx
import { useAuth } from '@lib/contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, tenantData } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {tenantData?.ownerName}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Conditional UI Rendering

The system supports conditional rendering based on authentication status:

```tsx
// In HeaderLanding
{
  isAuthenticated ? <OwnerMenu /> : <ButtonPrimary />;
}

// In MobileMenu
{
  isAuthenticated ? <OwnerMenu /> : <LinkLog />;
}

// In NaviLinks
{
  !isAuthenticated && <LinkLog />;
}
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
4. `checkAuth()` and `refreshTenantData()` are called automatically
5. User is redirected to dashboard after successful authentication

### Authentication Check

1. `AuthContext` calls GraphQL `validateToken` query on initialization
2. Query automatically includes HttpOnly cookies in request
3. Backend validates token and returns authentication status
4. Frontend updates `isAuthenticated` state accordingly
5. If authenticated, tenant data is automatically fetched

### Tenant Data Management

1. When user is authenticated, `FindTenantAuthInfo` query is executed
2. Tenant data (owner name, business name, logo) is stored in context
3. Components can access this data through `useAuth()` hook
4. Data is refreshed automatically when authentication state changes

### Logout Process

1. `useLogout` hook calls GraphQL logout mutation
2. Backend clears HttpOnly cookies
3. Frontend redirects to login page
4. Authentication and tenant data are cleared from context

## UI Integration

### Dynamic Content Display

Components automatically adapt based on authentication and tenant data:

- **OwnerMenu**: Shows owner initials and provides dashboard/profile navigation
- **WelcomeDashboard**: Displays personalized welcome message with owner name
- **Sidebar**: Shows company name and logo from tenant data
- **OwnerLogo**: Conditionally renders company logo if available

### Navigation Behavior

- **HeaderLanding**: Shows `OwnerMenu` for authenticated users, `ButtonPrimary` for guests
- **MobileMenu**: Shows `OwnerMenu` for authenticated users, login link for guests
- **NaviLinks**: Hides login link when user is authenticated

## Future Enhancements

1. **Token Refresh**: Implement automatic token refresh
2. **Role-Based Access**: Add user roles and permissions
3. **Session Management**: Add session timeout handling
4. **Remember Me**: Add persistent login option

## Testing Authentication

1. **Unauthenticated Access**: Visit `/dashboard` without valid cookies → should redirect to `/login`
2. **Authenticated Access**: Login and visit `/dashboard` → should show content with personalized data
3. **Public Routes**: Visit `/`, `/login`, `/register` → should work without authentication
4. **Cookie Security**: Check browser dev tools → `accessToken` should be HttpOnly and not accessible via JavaScript
5. **Server Validation**: Authentication state is validated server-side through GraphQL queries
6. **Cross-Tab Behavior**: Authentication state is consistent across browser tabs
7. **Tenant Data**: Verify that owner name, business name, and logo display correctly when authenticated
