import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

interface UseMultipleSoftDeleteProductsProps {
  onSuccess?: () => void;
}

export const useMultipleSoftDeleteProducts = ({
  onSuccess,
}: UseMultipleSoftDeleteProductsProps = {}) => {
  const t = useTranslations('Products');

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    refetchQueries: [
      {
        query: FindAllProductsDocument,
      },
    ],
    awaitRefetchQueries: true,
    // Don't use onCompleted here since it executes for each individual product
  });

  const handleMultipleSoftDelete = async (
    products: Array<{ id: string; isArchived?: boolean }>,
  ) => {
    // Filter out already archived products
    const productsToArchive = products.filter((product) => !product.isArchived);

    if (productsToArchive.length === 0) {
      return;
    }

    try {
      await Promise.all(
        productsToArchive.map(({ id }) =>
          softDeleteProduct({ variables: { id } }),
        ),
      );

      // Show success message after all operations complete
      toast.success(t('archivingSuccessful'), {
        description: t('multipleArchiveSuccessfulDescription'),
      });

      // Call success callback after all operations complete
      onSuccess?.();
    } catch (_error) {
      // Error handling is managed by the Apollo error middleware
    }
  };

  return {
    handleMultipleSoftDelete: (
      ids: string[],
      isArchived: boolean | boolean[],
    ) => {
      // Handle both single and multiple product cases
      const products = Array.isArray(isArchived)
        ? ids.map((id, index) => ({
            id,
            isArchived: isArchived[index],
          }))
        : ids.map((id) => ({
            id,
            isArchived,
          }));

      return handleMultipleSoftDelete(products);
    },
    loading,
    error,
  };
};

export default useMultipleSoftDeleteProducts;
