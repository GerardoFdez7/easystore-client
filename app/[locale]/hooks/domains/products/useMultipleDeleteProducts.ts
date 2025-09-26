import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  //FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client/react';

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
      } catch (_error) {}
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
