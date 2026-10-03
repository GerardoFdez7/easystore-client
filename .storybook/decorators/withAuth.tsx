import { ComponentType, ReactNode } from 'react';
import { ApolloMswMocks } from '../../app/[locale]/lib/storybook/ApolloMswMocks';
import { AuthProvider } from '../../app/[locale]/lib/contexts/AuthContext';
import {
  ValidateTokenDocument,
  FindTenantAuthInfoDocument,
} from '../../server/graphql/generated';

// Mock GraphQL responses for authentication
const authMocks = [
  {
    request: {
      query: ValidateTokenDocument,
    },
    result: {
      data: {
        validateToken: {
          success: true,
          message: 'Token is valid',
        },
      },
    },
  },
  {
    request: {
      query: FindTenantAuthInfoDocument,
    },
    result: {
      data: {
        getTenantById: {
          ownerName: 'John Doe',
          businessName: 'EasyStore Demo',
          logo: '/default.webp',
        },
      },
    },
  },
];

// Mock AuthProvider wrapper that provides GraphQL mocks
const MockAuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloMswMocks mocks={authMocks}>
      <AuthProvider
        fallback={<div>Loading...</div>}
        initialAuthState={{ isAuthenticated: true, loading: false }}
      >
        {children}
      </AuthProvider>
    </ApolloMswMocks>
  );
};

export const withAuth = (Story: ComponentType) => {
  return (
    <MockAuthWrapper>
      <Story />
    </MockAuthWrapper>
  );
};
