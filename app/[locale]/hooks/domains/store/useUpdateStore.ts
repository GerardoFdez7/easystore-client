'use client';

import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import {
  UpdateStoreDocument,
  UpdateStoreMutation,
  UpdateStoreMutationVariables,
} from '@graphql/generated';

export type StoreUpdateInput = UpdateStoreMutationVariables['input'];

/**
 * Updates the current store. Apollo normalizes the returned `Store`, so every
 * consumer of `useStoreInfo` refreshes without a refetch.
 * Resolves with the saved `store`, or `store: null` when the request failed.
 * Failures are reported by the global error handler, except a taken domain,
 * which is silenced there and flagged as `domainTaken` so the form can show it
 * on the domain field.
 */
export function useUpdateStore() {
  const [mutate, { loading }] = useMutation<
    UpdateStoreMutation,
    UpdateStoreMutationVariables
  >(UpdateStoreDocument);

  const updateStore = useCallback(
    async (input: StoreUpdateInput) => {
      try {
        const { data } = await mutate({ variables: { input } });
        return { store: data?.updateStore ?? null, domainTaken: false };
      } catch (error) {
        // The domain is a store's only unique field, so a conflict means it is taken.
        // Production masks the message, hence the code check.
        const domainTaken =
          CombinedGraphQLErrors.is(error) &&
          error.errors.some((e) => e.extensions?.code === 'CONFLICT');
        return { store: null, domainTaken };
      }
    },
    [mutate],
  );

  return { updateStore, isUpdating: loading };
}

export default useUpdateStore;
