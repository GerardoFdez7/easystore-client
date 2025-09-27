import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  RestoreDocument,
  RestoreMutation,
  RestoreMutationVariables,
  FindProductByIdDocument,
  FindProductByIdQuery,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

export const useRestoreProduct = () => {
  const t = useTranslations('Products');

  const [restoreProduct, { loading, error }] = useMutation<
    RestoreMutation,
    RestoreMutationVariables
  >(RestoreDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (data?.restoreProduct && variables?.id) {
        // Update FindProductByIdDocument cache (for individual product detail)
        cache.updateQuery<FindProductByIdQuery>(
          {
            query: FindProductByIdDocument,
            variables: { id: variables.id },
          },
          (existingData) => {
            if (!existingData?.getProductById) {
              return existingData;
            }

            return {
              ...existingData,
              getProductById: {
                ...existingData.getProductById,
                isArchived: false,
              },
            };
          },
        );
      }
    },
    onCompleted: (data) => {
      if (data?.restoreProduct) {
        toast.success(t('restoreSuccessful'), {
          description: t('restoreSuccessfulDescription'),
        });
        // Cache is updated automatically via the update function above
      }
    },
  });

  const handleRestore = async (id: string) => {
    try {
      await restoreProduct({ variables: { id } });
    } catch (_error) {}
  };

  return {
    handleRestore,
    loading,
    error,
  };
};

export default useRestoreProduct;
