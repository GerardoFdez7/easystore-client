import React from 'react';

// Mock useSearchParams hook
const mockSearchParams = new URLSearchParams('?token=mock-reset-token-123');

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

export const withMockSearchParams = (Story: React.ComponentType) => {
  return <Story />;
};
