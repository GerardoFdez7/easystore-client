import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindAllProductsDocument,
  FindAllProductsQuery,
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
    update: (cache, { data }, { variables }) => {
      if (data?.softDeleteProduct && variables?.id) {
        const productId = variables.id;

        // Try to find and update the product in the cache
        cache.modify({
          id: cache.identify({ __typename: 'Product', id: productId }),
          fields: {
            isArchived() {
              return true;
            },
          },
        });

        // Also update all possible query variants that might contain this product
        const queryVariants = [{ type: null }, {}, undefined];

        queryVariants.forEach((queryVariables) => {
          try {
            cache.updateQuery<FindAllProductsQuery>(
              {
                query: FindAllProductsDocument,
                variables: queryVariables,
              },
              (existingData) => {
                if (!existingData?.getAllProducts?.products) {
                  return existingData;
                }

                return {
                  ...existingData,
                  getAllProducts: {
                    ...existingData.getAllProducts,
                    products: existingData.getAllProducts.products.map(
                      (product) =>
                        product.id === variables.id
                          ? { ...product, isArchived: true }
                          : product,
                    ),
                  },
                };
              },
            );
          } catch (_error) {
            // Silently ignore cache update errors for missing queries
            console.debug(
              'Cache update skipped for variables:',
              queryVariables,
            );
          }
        });
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
