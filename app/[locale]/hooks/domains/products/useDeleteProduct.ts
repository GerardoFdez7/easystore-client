import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  HardDeleteDocument,
  HardDeleteMutation,
  HardDeleteMutationVariables,
  FindAllProductsDocument,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

export const useDeleteProduct = () => {
  const t = useTranslations('Products');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [deleteProduct, { loading, error }] = useMutation<
    HardDeleteMutation,
    HardDeleteMutationVariables
  >(HardDeleteDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    // Use refetchQueries but ONLY for the products list, not the individual product
    refetchQueries: [
      {
        query: FindAllProductsDocument,
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (data?.hardDeleteProduct) {
        toast.success(t('deletionSuccessful'), {
          description: t('deletionSuccessfulDescription'),
        });

        // Redirect immediately - no need for delay with refetchQueries
        router.push(`/${locale}/products`);
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
