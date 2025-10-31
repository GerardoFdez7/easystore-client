import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type {
  ArchiveVariantOfProductMutation,
  ArchiveVariantOfProductMutationVariables,
  FindProductByIdQuery,
} from '@graphql/generated';
import {
  ArchiveVariantOfProductDocument,
  FindProductByIdDocument,
} from '@graphql/generated';

export function useSoftDeleteVariant() {
  const t = useTranslations('Variant');

  const [archiveVariantMutation, { loading }] = useMutation<
    ArchiveVariantOfProductMutation,
    ArchiveVariantOfProductMutationVariables
  >(ArchiveVariantOfProductDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (data?.archiveVariant && variables?.id && variables?.productId) {
        // Update FindProductByIdDocument cache to mark variant as archived
        cache.updateQuery<FindProductByIdQuery>(
          {
            query: FindProductByIdDocument,
            variables: { id: variables.productId },
          },
          (existingData) => {
            if (!existingData?.getProductById?.variants) {
              return existingData;
            }

            return {
              ...existingData,
              getProductById: {
                ...existingData.getProductById,
                variants: existingData.getProductById.variants.map((variant) =>
                  variant.id === variables.id
                    ? { ...variant, isArchived: true }
                    : variant,
                ),
              },
            };
          },
        );
      }
    },
    onCompleted: () => {
      toast.success(t('archivingSuccessful'), {
        description: t('archiveSuccessfulDescription'),
      });
    },
  });

  const handleSoftDelete = async (variantId: string, productId: string) => {
    await archiveVariantMutation({
      variables: {
        id: variantId,
        productId,
      },
    });
  };

  return { handleSoftDelete, loading };
}
