import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import {
  UpdateVariantInProductDocument,
  UpdateVariantInProductMutation,
  UpdateVariantInProductMutationVariables,
} from '@graphql/generated';

export function useUpdateVariant(variantId?: string, productId?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [updateVariantMutation] = useMutation<
    UpdateVariantInProductMutation,
    UpdateVariantInProductMutationVariables
  >(UpdateVariantInProductDocument);

  const updateVariant = async (
    data: UpdateVariantInProductMutationVariables['input'],
  ) => {
    if (!variantId || !productId) {
      throw new Error('Both Variant ID and Product ID are required for update');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateVariantMutation({
        variables: {
          id: variantId,
          productId,
          input: {
            ...data,
          },
        },
      });

      setLoading(false);
      return result.data?.updateVariant;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      setLoading(false);
      throw err;
    }
  };

  return {
    updateVariant,
    loading,
    error,
  };
}
