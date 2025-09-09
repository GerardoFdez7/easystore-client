import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  FindAllProductsDocument,
  // FindAllProductsQuery,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';

export const useMultipleDeleteProducts = (onSuccess?: () => void) => {
  const client = useApolloClient();
  const t = useTranslations('Products');

  const [deleteProduct, { loading, error }] = useMutation<
    HardDeleteMutation,
    HardDeleteMutationVariables
  >(HardDeleteDocument, {
    //---------------------------------------------------------------
    // update: (cache, { data }) => {
    //   if (!data?.hardDeleteProduct) return;

    //   // Read current cache
    //   const existingData = cache.readQuery<FindAllProductsQuery>({
    //     query: FindAllProductsDocument,
    //   });

    //   if (!existingData?.getAllProducts?.products) return;

    //   // Update cache
    //   const deletedProductName = data.hardDeleteProduct.name;
    //   const updatedProducts = existingData.getAllProducts.products.filter(
    //     (product) => product.name !== deletedProductName,
    //   );

    //   cache.writeQuery({
    //     query: FindAllProductsDocument,
    //     data: {
    //       getAllProducts: {
    //         ...existingData.getAllProducts,
    //         products: updatedProducts,
    //         total: Math.max(0, (existingData.getAllProducts.total || 1) - 1),
    //       },
    //     },
    //   });
    // },
    //---------------------------------------------------------------
    onCompleted: (data) => {
      if (data?.hardDeleteProduct) {
        // Refetch the products query
        client
          .refetchQueries({
            include: [FindAllProductsDocument],
          })
          .then(() => {
            // Clear selected products after successful deletion
            onSuccess?.();
          })
          .catch(console.error);
      }
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        toast.error('Delete failed', {
          description: graphQLError.message,
        });
      } else if (error.networkError) {
        toast.error(t('networkError'), {
          description: t('networkErrorDescription'),
        });
      } else {
        toast.error(t('unexpectedError'), {
          description: t('unexpectedErrorDescription'),
        });
      }
    },
  });

  const handleMultipleDelete = async (ids: string[]) => {
    try {
      await Promise.all(
        ids.map((id) =>
          deleteProduct({
            variables: { id },
            //---------------------
            // optimisticResponse: {
            //   hardDeleteProduct: { name: id, __typename: 'Product' },
            // },
            //---------------------
          }),
        ),
      );

      toast.success('Products deleted successfully', {
        description: `Successfully deleted ${ids.length} product${ids.length > 1 ? 's' : ''}.`,
      });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error deleting products:', error);
    }
  };

  return {
    handleMultipleDelete,
    loading,
    error,
  };
};

export default useMultipleDeleteProducts;
