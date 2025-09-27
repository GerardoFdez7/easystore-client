import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindProductByIdDocument,
  FindProductByIdQuery,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

export const useSoftDeleteProduct = () => {
  const t = useTranslations('Products');

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (data?.softDeleteProduct && variables?.id) {
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
                isArchived: true,
              },
            };
          },
        );
      }
    },
    onCompleted: (data) => {
      if (data?.softDeleteProduct) {
        toast.success(t('archivingSuccessful'), {
          description: t('archiveSuccessfulDescription'),
        });
        // Cache is updated automatically via the update function above
      }
    },
  });

  const handleSoftDelete = async (id: string) => {
    try {
      await softDeleteProduct({ variables: { id } });
    } catch (_error) {}
  };

  return {
    handleSoftDelete,
    loading,
    error,
  };
};

export default useSoftDeleteProduct;
