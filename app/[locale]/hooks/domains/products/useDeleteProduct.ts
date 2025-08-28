import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import useMutation from '../../useMutation';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';

export const useDeleteProduct = () => {
  const client = useApolloClient();
  const t = useTranslations('Products');

  const {
    mutate: deleteProduct,
    isLoading,
    errors,
  } = useMutation<HardDeleteMutation, HardDeleteMutationVariables>(
    HardDeleteDocument,
    undefined,
    {
      onCompleted: (data) => {
        if (data?.hardDeleteProduct) {
          toast.success('Product deleted successfully', {
            description: 'Product deleted successfully',
          });
          // Refetch the products query
          client
            .refetchQueries({
              include: [FindAllProductsDocument],
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
    },
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error deleting product:', error);
    }
  };

  //   const handleDelete = async (ids: string[]) => {
  //     try {
  //       await Promise.all(ids.map((id) => deleteProduct({ variables: { id } })));

  //       toast.success('Products deleted successfully', {
  //         description: `Successfully deleted ${ids.length} product${ids.length > 1 ? 's' : ''}.`,
  //       });
  //     } catch (error) {
  //       // Error is already handled by the onError callback
  //       console.error('Error deleting products:', error);
  //     }
  //   };

  return {
    handleDelete,
    isLoading,
    errors,
  };
};

export default useDeleteProduct;
