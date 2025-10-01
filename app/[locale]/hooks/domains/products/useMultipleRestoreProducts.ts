import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  RestoreDocument,
  RestoreMutation,
  RestoreMutationVariables,
  FindAllProductsDocument,
  FindAllProductsQuery,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

interface UseMultipleRestoreProductsProps {
  onSuccess?: () => void;
}

export const useMultipleRestoreProducts = ({
  onSuccess,
}: UseMultipleRestoreProductsProps = {}) => {
  const t = useTranslations('Products');

  const [restoreProduct, { loading, error }] = useMutation<
    RestoreMutation,
    RestoreMutationVariables
  >(RestoreDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    update: (cache, { data }, { variables }) => {
      if (data?.restoreProduct && variables?.id) {
        const productId = variables.id;

        // Try to find and update the product in the cache
        cache.modify({
          id: cache.identify({ __typename: 'Product', id: productId }),
          fields: {
            isArchived() {
              return false; // Restore sets isArchived to false
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
                          ? { ...product, isArchived: false } // Restore sets isArchived to false
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

  const handleMultipleRestore = async (
    products: Array<{ id: string; isArchived?: boolean }>,
  ) => {
    // Filter out already active products (only restore archived ones)
    const productsToRestore = products.filter((product) => product.isArchived);

    if (productsToRestore.length === 0) {
      return;
    }

    try {
      await Promise.all(
        productsToRestore.map(({ id }) =>
          restoreProduct({ variables: { id } }),
        ),
      );

      // Show success message after all operations complete
      toast.success(t('restoreSuccessful'), {
        description: t('multipleRestoreSuccessfulDescription'),
      });

      // Call success callback after all operations complete
      onSuccess?.();
    } catch (_error) {
      // Error handling is managed by the Apollo error middleware
    }
  };

  return {
    handleMultipleRestore: (ids: string[], isArchived: boolean | boolean[]) => {
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

      return handleMultipleRestore(products);
    },
    loading,
    error,
  };
};

export default useMultipleRestoreProducts;
