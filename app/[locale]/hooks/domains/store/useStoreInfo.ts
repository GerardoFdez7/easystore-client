'use client';

import { useQuery } from '@apollo/client/react';
import {
  FindCurrentStoreDocument,
  FindCurrentStoreQuery,
} from '@graphql/generated';

/** The authenticated tenant's current store (resolved server-side from the session). */
export function useStoreInfo() {
  const { data, loading } = useQuery<FindCurrentStoreQuery>(
    FindCurrentStoreDocument,
    { errorPolicy: 'all' },
  );

  return { store: data?.getStoreById, loading };
}

export default useStoreInfo;
