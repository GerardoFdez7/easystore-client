import type { ReactNode } from 'react';
import type { FindCurrentStoreQuery } from '@graphql/generated';

export type CurrentStore = NonNullable<FindCurrentStoreQuery['getStoreById']>;

export interface StoreProfileDialogProps {
  store: CurrentStore;
  /** Element that opens the dialog when clicked. */
  children: ReactNode;
}
