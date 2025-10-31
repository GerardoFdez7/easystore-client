import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type {
  RestoreVariantOfProductMutation,
  RestoreVariantOfProductMutationVariables,
  FindProductByIdQuery,
} from '@graphql/generated';
import {
  RestoreVariantOfProductDocument,
  FindProductByIdDocument,
} from '@graphql/generated';

export function useRestoreVariant() {
  const t = useTranslations('Variant');

  const [restoreVariantMutation, { loading }] = useMutation<
    RestoreVariantOfProductMutation,
    RestoreVariantOfProductMutationVariables
  >(RestoreVariantOfProductDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (data?.restoreVariant && variables?.id && variables?.productId) {
        // Update FindProductByIdDocument cache to mark variant as not archived
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
                    ? { ...variant, isArchived: false }
                    : variant,
                ),
              },
            };
          },
        );
      }
    },
    onCompleted: () => {
      toast.success(t('restoreSuccessful'), {
        description: t('restoreSuccessfulDescription'),
      });
    },
  });

  const handleRestore = async (variantId: string, productId: string) => {
    await restoreVariantMutation({
      variables: {
        id: variantId,
        productId,
      },
    });
  };

  return { handleRestore, loading };
}
