import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';

export const useDeleteProduct = () => {
  const t = useTranslations('Products');
  const router = useRouter();
  const client = useApolloClient();

  const [deleteProduct, { loading, error }] = useMutation<
    HardDeleteMutation,
    HardDeleteMutationVariables
  >(HardDeleteDocument, {
    onCompleted: (data) => {
      if (data?.hardDeleteProduct) {
        // Invalidate the cache to ensure fresh data when navigating back
        client.cache.evict({ fieldName: 'getAllProducts' });

        // Refetch active queries
        void client.refetchQueries({ include: ['active'] });

        toast.success(t('deletionSuccessful'), {
          description: t('deletionSuccessfulDescription'),
        });
        router.push('/products');
      }
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        toast.error(t('deletionFailed'), {
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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error deleting product:', error);
    }
  };

  return {
    handleDelete,
    loading,
    error,
  };
};

export default useDeleteProduct;
