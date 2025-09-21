import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useApolloClient } from '@apollo/client';

interface UseMultipleSoftDeleteProductsProps {
  onSuccess?: () => void;
}

export const useMultipleSoftDeleteProducts = ({
  onSuccess,
}: UseMultipleSoftDeleteProductsProps = {}) => {
  const client = useApolloClient();
  const t = useTranslations('Products');

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
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
        toast.error(t('archiveFailed'), {
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

  const handleMultipleSoftDelete = async (
    products: Array<{ id: string; isArchived?: boolean }>,
  ) => {
    // Filter out already archived products
    const productsToArchive = products.filter((product) => !product.isArchived);

    if (productsToArchive.length === 0) {
      return;
    }

    try {
      await Promise.all(
        productsToArchive.map(({ id }) =>
          softDeleteProduct({ variables: { id } }),
        ),
      );

      toast.success(t('archivingSuccessful'), {
        description: t('multipleArchiveSuccessfulDescription'),
      });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error archiving products:', error);
    }
  };

  return {
    handleMultipleSoftDelete: (
      ids: string[],
      isArchived: boolean | boolean[],
    ) => {
      // Handle both single and multiple product cases
      const products = Array.isArray(isArchived)
        ? ids.map((id, index) => ({
            id,
            isArchived: isArchived[index],
          }))
        : ids.map((id) => ({
            id,
            isArchived,
          }));

      return handleMultipleSoftDelete(products);
    },
    loading,
    error,
  };
};

export default useMultipleSoftDeleteProducts;
