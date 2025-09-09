import { toast } from 'sonner';
import {
  SoftDeleteDocument,
  SoftDeleteMutation,
  SoftDeleteMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const useSoftDeleteProduct = () => {
  const t = useTranslations('Products');
  const router = useRouter();

  const [softDeleteProduct, { loading, error }] = useMutation<
    SoftDeleteMutation,
    SoftDeleteMutationVariables
  >(SoftDeleteDocument, {
    onCompleted: (data) => {
      if (data?.softDeleteProduct) {
        toast.success('Product archived successfully', {
          description: 'The product has been moved to the archive',
        });
        router.refresh(); // Refresh the current page to reflect changes
      }
    },
    onError: (error) => {
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
  });

  const handleSoftDelete = async (id: string) => {
    try {
      await softDeleteProduct({ variables: { id } });
    } catch (error) {
      // Error is already handled by the onError callback
      console.error('Error archiving product:', error);
    }
  };

  return {
    handleSoftDelete,
    loading,
    error,
  };
};

export default useSoftDeleteProduct;
