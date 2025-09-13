'use client';

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import getClient from './client';
import { useEffect, useState } from 'react';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <ApolloNextAppProvider makeClient={getClient}>
      {isHydrated ? children : <div></div>}
    </ApolloNextAppProvider>
  );
}
