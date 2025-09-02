import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import useMutation from '../../useMutation';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';

export const useMultipleSoftDeleteProducts = (onSuccess?: () => void) => {
  const client = useApolloClient();
  const t = useTranslations('Products');

  const {
    mutate: softDeleteProduct,
    isLoading,
    errors,
  } = useMutation<SoftDeleteMutation, SoftDeleteMutationVariables>(
    SoftDeleteDocument,
    undefined,
    {
      onCompleted: (data) => {
        if (data?.softDeleteProduct) {
          // Refetch the products query
          client
            .refetchQueries({
              include: [FindAllProductsDocument],
            })
            .then(() => {
              onSuccess?.();
            })
            .catch(console.error);
        }
      },
      onError: (error) => {
        // Skip error handling if the product is already archived
        const isAlreadyArchived = error.graphQLErrors?.some((e) =>
          e.message.includes('is already soft deleted'),
        );

        if (isAlreadyArchived) {
          return; // Skip showing any error toast
        }

        if (error.graphQLErrors?.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          toast.error('Archive failed', {
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

  const handleMultipleSoftDelete = async (ids: string[]) => {
    try {
      await Promise.all(
        ids.map((id) => softDeleteProduct({ variables: { id } })),
      );

      toast.success('Products archived successfully', {
        description: `Successfully archived ${ids.length} product${ids.length > 1 ? 's' : ''}.`,
      });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error archiving products:', error);
    }
  };

  return {
    handleMultipleSoftDelete,
    isLoading,
    errors,
  };
};

export default useMultipleSoftDeleteProducts;
