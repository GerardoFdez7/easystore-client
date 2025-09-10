import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  //FindAllProductsDocument,
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
    onCompleted: () => {
      try {
        //Invalidates the cache
        client.cache.evict({ fieldName: 'getAllProducts' });

        // Refetch active queries
        void client.refetchQueries({ include: ['active'] });

        //Call onSuccess if exists
        onSuccess?.();
      } catch (error) {
        console.error('Error refetching queries:', error);
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

  const handleMultipleDelete = async (ids: string[]) => {
    try {
      await Promise.all(
        ids.map((id) =>
          deleteProduct({
            variables: { id },
          }),
        ),
      );

      toast.success(t('deletionSuccessful'), {
        description: t('multipleDeletionSuccessfulDescription'),
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
