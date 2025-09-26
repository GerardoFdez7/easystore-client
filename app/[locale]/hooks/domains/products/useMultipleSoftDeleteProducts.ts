import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client/react';

interface UseMultipleSoftDeleteProductsProps {
  onSuccess?: () => void;
}

export const useMultipleSoftDeleteProducts = ({
  onSuccess,
}: UseMultipleSoftDeleteProductsProps = {}) => {
  const client = useApolloClient();
  const t = useTranslations('Products');

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
    onCompleted: (data) => {
      if (data?.softDeleteProduct) {
        // Refetch the products query
        client
          .refetchQueries({
            include: [FindAllProductsDocument],
          })
          .then(() => {
            onSuccess?.();
          })
          .catch(() => {});
      }
    },
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

      toast.success(t('archivingSuccessful'), {
        description: t('multipleArchiveSuccessfulDescription'),
      });
    } catch (_error) {}
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
