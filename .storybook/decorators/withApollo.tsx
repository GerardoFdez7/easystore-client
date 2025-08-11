import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '../../lib/apollo/apollo';

export const withApollo = (Story: React.ComponentType) => {
  return (
    <ApolloProvider client={getClient()}>
      <Story />
    </ApolloProvider>
  );
};
