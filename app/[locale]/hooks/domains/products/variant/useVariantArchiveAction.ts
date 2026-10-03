import type { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  ArchiveVariantOfProductDocument,
  RestoreVariantOfProductDocument,
  FindProductByIdDocument,
  type ArchiveVariantOfProductMutation,
  type ArchiveVariantOfProductMutationVariables,
  type FindProductByIdQuery,
  type RestoreVariantOfProductMutation,
} from '@graphql/generated';

type VariantArchiveAction = 'archive' | 'restore';
type VariantArchiveMutation =
  | ArchiveVariantOfProductMutation
  | RestoreVariantOfProductMutation;

const actionConfig: Record<
  VariantArchiveAction,
  {
    document: DocumentNode;
    targetState: boolean;
    title: 'archivingSuccessful' | 'restoreSuccessful';
    description:
      | 'archiveSuccessfulDescription'
      | 'restoreSuccessfulDescription';
  }
> = {
  archive: {
    document: ArchiveVariantOfProductDocument,
    targetState: true,
    title: 'archivingSuccessful',
    description: 'archiveSuccessfulDescription',
  },
  restore: {
    document: RestoreVariantOfProductDocument,
    targetState: false,
    title: 'restoreSuccessful',
    description: 'restoreSuccessfulDescription',
  },
};

function mutationSucceeded(
  action: VariantArchiveAction,
  data?: VariantArchiveMutation | null,
) {
  if (!data) return false;
  return action === 'archive'
    ? 'archiveVariant' in data && Boolean(data.archiveVariant)
    : 'restoreVariant' in data && Boolean(data.restoreVariant);
}

export function useVariantArchiveAction(action: VariantArchiveAction) {
  const t = useTranslations('Variant');
  const config = actionConfig[action];
  const [mutateVariant, { loading }] = useMutation<
    VariantArchiveMutation,
    ArchiveVariantOfProductMutationVariables
  >(config.document, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (!mutationSucceeded(action, data) || !variables) return;

      cache.updateQuery<FindProductByIdQuery>(
        {
          query: FindProductByIdDocument,
          variables: { id: variables.productId },
        },
        (existingData) => {
          if (!existingData?.getProductById?.variants) return existingData;

          return {
            ...existingData,
            getProductById: {
              ...existingData.getProductById,
              variants: existingData.getProductById.variants.map((variant) =>
                variant.id === variables.id
                  ? { ...variant, isArchived: config.targetState }
                  : variant,
              ),
            },
          };
        },
      );
    },
    onCompleted: () => {
      toast.success(t(config.title), { description: t(config.description) });
    },
  });

  const run = async (variantId: string, productId: string) => {
    await mutateVariant({ variables: { id: variantId, productId } });
  };

  return { run, loading };
}
