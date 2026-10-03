import type { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  RestoreDocument,
  SoftDeleteDocument,
  type RestoreMutation,
  type SoftDeleteMutation,
  type SoftDeleteMutationVariables,
} from '@graphql/generated';
import { updateProductArchiveState } from './productCacheUpdates';

type ArchiveAction = 'archive' | 'restore';
type ArchiveMutation = SoftDeleteMutation | RestoreMutation;
type ProductArchiveState = { id: string; isArchived?: boolean };

const actionConfig: Record<
  ArchiveAction,
  {
    document: DocumentNode;
    targetState: boolean;
    title: 'archivingSuccessful' | 'restoreSuccessful';
    description:
      | 'multipleArchiveSuccessfulDescription'
      | 'multipleRestoreSuccessfulDescription';
  }
> = {
  archive: {
    document: SoftDeleteDocument,
    targetState: true,
    title: 'archivingSuccessful',
    description: 'multipleArchiveSuccessfulDescription',
  },
  restore: {
    document: RestoreDocument,
    targetState: false,
    title: 'restoreSuccessful',
    description: 'multipleRestoreSuccessfulDescription',
  },
};

function mutationSucceeded(
  action: ArchiveAction,
  data?: ArchiveMutation | null,
) {
  if (!data) return false;
  return action === 'archive'
    ? 'softDeleteProduct' in data && Boolean(data.softDeleteProduct)
    : 'restoreProduct' in data && Boolean(data.restoreProduct);
}

export function useBulkProductArchiveAction(
  action: ArchiveAction,
  onSuccess?: () => void,
) {
  const t = useTranslations('Products');
  const config = actionConfig[action];
  const [mutateProduct, { loading, error }] = useMutation<
    ArchiveMutation,
    SoftDeleteMutationVariables
  >(config.document, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (mutationSucceeded(action, data) && variables?.id) {
        updateProductArchiveState(cache, variables.id, config.targetState);
      }
    },
  });

  const run = async (ids: string[], isArchived: boolean | boolean[]) => {
    const products: ProductArchiveState[] = Array.isArray(isArchived)
      ? ids.map((id, index) => ({ id, isArchived: isArchived[index] }))
      : ids.map((id) => ({ id, isArchived }));
    const targets = products.filter(
      (product) => product.isArchived !== config.targetState,
    );

    if (targets.length === 0) return;

    try {
      await Promise.all(
        targets.map(({ id }) => mutateProduct({ variables: { id } })),
      );
      toast.success(t(config.title), { description: t(config.description) });
      onSuccess?.();
    } catch (_error) {
      // Error handling is managed by the Apollo error middleware.
    }
  };

  return { run, loading, error };
}
