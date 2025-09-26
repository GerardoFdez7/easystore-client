import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
} from '@graphql/generated';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const useSoftDeleteProduct = () => {
  const t = useTranslations('Products');
  const router = useRouter();
  const client = useApolloClient();

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
    onCompleted: (data) => {
      if (data?.softDeleteProduct) {
        // Invalidate the cache to ensure fresh data
        client.cache.evict({ fieldName: 'getAllProducts' });

        // Refetch active queries
        void client.refetchQueries({ include: ['active'] });

        toast.success(t('archivingSuccessful'), {
          description: t('archiveSuccessfulDescription'),
        });
        router.refresh(); // Refresh the current page to reflect changes
      }
    },
  });

  const handleSoftDelete = async (id: string) => {
    try {
      await softDeleteProduct({ variables: { id } });
    } catch (_error) {}
  };

  return {
    handleSoftDelete,
    loading,
    error,
  };
};

export default useSoftDeleteProduct;
