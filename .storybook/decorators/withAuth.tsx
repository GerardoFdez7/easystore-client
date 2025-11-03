import { ComponentType, ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing/react';
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
    <MockedProvider mocks={authMocks}>
      <AuthProvider fallback={<div>Loading...</div>}>{children}</AuthProvider>
    </MockedProvider>
  );
};

export const withAuth = (Story: ComponentType) => {
  return (
    <MockAuthWrapper>
      <Story />
    </MockAuthWrapper>
  );
};
