import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useCallback } from 'react';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

export const useMultipleDeleteProducts = (onSuccess?: () => void) => {
  const t = useTranslations('Products');

  const [deleteProduct, { loading, error }] = useMutation<
    HardDeleteMutation,
    HardDeleteMutationVariables
  >(HardDeleteDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    refetchQueries: [
      {
        query: FindAllProductsDocument,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleMultipleDelete = useCallback(
    async (ids: string[]) => {
      try {
        // Execute all deletions
        await Promise.all(
          ids.map((id) =>
            deleteProduct({
              variables: { id },
            }),
          ),
        );

        // Show success message after all operations complete
        if (ids.length === 1) {
          toast.success(t('deletionSuccessful'), {
            description: t('deletionSuccessfulDescription'),
          });
        } else {
          toast.success(t('deletionSuccessful'), {
            description: t('multipleDeletionSuccessfulDescription'),
          });
        }
        onSuccess?.();
      } catch (_error) {}
    },
    [deleteProduct, onSuccess, t],
  );

  return {
    handleMultipleDelete,
    loading,
    error,
  };
};

export default useMultipleDeleteProducts;
