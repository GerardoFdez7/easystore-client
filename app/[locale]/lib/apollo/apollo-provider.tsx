'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import getClient from './client';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={getClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
