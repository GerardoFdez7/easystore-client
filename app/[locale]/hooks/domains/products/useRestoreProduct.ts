import { toast } from 'sonner';
import {
  RestoreDocument,
  RestoreMutation,
  RestoreMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';

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
    onError: (error) => {
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        toast.error(t('restoreFailed'), {
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

  const handleRestore = async (id: string) => {
    try {
      await restoreProduct({ variables: { id } });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error restoring product:', error);
    }
  };

  return {
    handleRestore,
    loading,
    error,
  };
};

export default useRestoreProduct;
