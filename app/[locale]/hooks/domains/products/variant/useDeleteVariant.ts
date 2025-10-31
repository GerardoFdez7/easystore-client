import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type {
  RemoveVariantfromProductMutation,
  RemoveVariantfromProductMutationVariables,
} from '@graphql/generated';
import { RemoveVariantfromProductDocument } from '@graphql/generated';

export function useDeleteVariant() {
  const t = useTranslations('Variant');
  const router = useRouter();

  const [removeVariantMutation, { loading }] = useMutation<
    RemoveVariantfromProductMutation,
    RemoveVariantfromProductMutationVariables
  >(RemoveVariantfromProductDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    refetchQueries: ['findProductById'],
    awaitRefetchQueries: true,
    onCompleted: () => {
      toast.success(t('deleteSuccessful'), {
        description: t('deleteSuccessfulDescription'),
      });

      // Navigate back to previous page
      router.back();
    },
  });

  const handleDelete = async (variantId: string, productId: string) => {
    await removeVariantMutation({
      variables: {
        id: variantId,
        productId,
      },
    });
  };

  return { handleDelete, loading };
}
