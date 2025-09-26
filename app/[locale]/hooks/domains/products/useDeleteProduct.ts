import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client/react';

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
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
    } catch (_error) {}
  };

  return {
    handleDelete,
    loading,
    error,
  };
};

export default useDeleteProduct;
