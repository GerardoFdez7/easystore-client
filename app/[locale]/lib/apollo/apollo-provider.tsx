'use client';

import { ApolloProvider } from '@apollo/client';
import { getClient } from './apollo';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
