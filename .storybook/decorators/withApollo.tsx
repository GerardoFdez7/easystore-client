import { ComponentType } from 'react';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import getClient from '../../app/[locale]/lib/apollo/client';

export const withApollo = (Story: ComponentType) => {
  return (
    <ApolloNextAppProvider makeClient={getClient}>
      <Story />
    </ApolloNextAppProvider>
  );
};
