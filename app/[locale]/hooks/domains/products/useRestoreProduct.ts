import { toast } from 'sonner';
import {
  RestoreDocument,
  RestoreMutation,
  RestoreMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client/react';

export const useRestoreProduct = () => {
  const t = useTranslations('Products');
  const router = useRouter();
  const client = useApolloClient();

  const [restoreProduct, { loading, error }] = useMutation<
    RestoreMutation,
    RestoreMutationVariables
  >(RestoreDocument, {
    onCompleted: (data) => {
      if (data?.restoreProduct) {
        // Invalidate the cache to ensure fresh data
        client.cache.evict({ fieldName: 'getAllProducts' });

        // Refetch active queries
        void client.refetchQueries({ include: ['active'] });

        toast.success(t('restoreSuccessful'), {
          description: t('restoreSuccessfulDescription'),
        });
        router.refresh(); // Refresh the current page to reflect changes
      }
    },
  });

  const handleRestore = async (id: string) => {
    try {
      await restoreProduct({ variables: { id } });
    } catch (_error) {}
  };

  return {
    handleRestore,
    loading,
    error,
  };
};

export default useRestoreProduct;
