'use client';

import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  UpdateVariantInProductDocument,
  AddVariantToProductDocument,
  FindProductByIdDocument,
  FindProductByIdQuery,
  FindAllProductsDocument,
  FindAllProductsQuery,
  type UpdateVariantInProductMutation,
  type UpdateVariantInProductMutationVariables,
  type AddVariantToProductMutation,
  type AddVariantToProductMutationVariables,
} from '@graphql/generated';

interface UseVariantManagementReturn {
  // CRUD operations
  addVariant: (
    input: AddVariantToProductMutationVariables['input'],
  ) => Promise<AddVariantToProductMutation['addVariant'] | null>;

  updateVariant: (
    variantId: string,
    productId: string,
    input: UpdateVariantInProductMutationVariables['input'],
  ) => Promise<UpdateVariantInProductMutation['updateVariant'] | null>;

  // Loading states
  isAdding: boolean;
  isUpdating: boolean;
  error: Error | null;
}

export function useVariantManagement(): UseVariantManagementReturn {
  const t = useTranslations('Products');

  // Mutations with manual cache updates (more efficient than refetchQueries)
  const [addVariantMutation, { loading: isAdding, error: addError }] =
    useMutation(AddVariantToProductDocument, {
      errorPolicy: 'all',
      update: (cache, { data }, { variables }) => {
        if (data?.addVariant && variables?.input.productId) {
          const productId = variables.input.productId;
          const updatedVariants = data.addVariant.variants;

          // Update FindProductByIdDocument cache (for individual product detail)
          cache.updateQuery<FindProductByIdQuery>(
            {
              query: FindProductByIdDocument,
              variables: { id: productId },
            },
            (existingData) => {
              if (!existingData?.getProductById) {
                return existingData;
              }

              return {
                ...existingData,
                getProductById: {
                  ...existingData.getProductById,
                  variants: updatedVariants,
                },
              };
            },
          );

          // Update FindAllProductsDocument cache (for products list)
          cache.updateQuery<FindAllProductsQuery>(
            {
              query: FindAllProductsDocument,
            },
            (existingData) => {
              if (!existingData?.getAllProducts) {
                return existingData;
              }

              return {
                ...existingData,
                getAllProducts: {
                  ...existingData.getAllProducts,
                  products: existingData.getAllProducts.products.map(
                    (product) =>
                      product.id === productId
                        ? { ...product, variants: updatedVariants }
                        : product,
                  ),
                },
              };
            },
          );
        }
      },
    });

  const [updateVariantMutation, { loading: isUpdating, error: updateError }] =
    useMutation(UpdateVariantInProductDocument, {
      errorPolicy: 'all',
      update: (cache, { data }, { variables }) => {
        if (data?.updateVariant && variables?.productId) {
          const productId = variables.productId;
          const updatedVariants = data.updateVariant.variants;

          // Update FindProductByIdDocument cache (for individual product detail)
          cache.updateQuery<FindProductByIdQuery>(
            {
              query: FindProductByIdDocument,
              variables: { id: productId },
            },
            (existingData) => {
              if (!existingData?.getProductById) {
                return existingData;
              }

              return {
                ...existingData,
                getProductById: {
                  ...existingData.getProductById,
                  variants: updatedVariants,
                },
              };
            },
          );

          // Update FindAllProductsDocument cache (for products list)
          cache.updateQuery<FindAllProductsQuery>(
            {
              query: FindAllProductsDocument,
            },
            (existingData) => {
              if (!existingData?.getAllProducts) {
                return existingData;
              }

              return {
                ...existingData,
                getAllProducts: {
                  ...existingData.getAllProducts,
                  products: existingData.getAllProducts.products.map(
                    (product) =>
                      product.id === productId
                        ? { ...product, variants: updatedVariants }
                        : product,
                  ),
                },
              };
            },
          );
        }
      },
    });

  // CRUD operations
  const addVariant = useCallback(
    async (input: AddVariantToProductMutationVariables['input']) => {
      if (!input.productId) {
        throw new Error('Product ID is required to add a variant');
      }

      try {
        const result = await addVariantMutation({
          variables: {
            input,
          },
        });

        if (result.data?.addVariant) {
          toast.success(t('savedChangesTitle'), {
            description: t('variantCreated'),
          });
          return result.data.addVariant;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [addVariantMutation, t],
  );

  const updateVariant = useCallback(
    async (
      variantId: string,
      productId: string,
      input: UpdateVariantInProductMutationVariables['input'],
    ) => {
      if (!variantId || !productId) {
        throw new Error(
          'Both Variant ID and Product ID are required for update',
        );
      }

      try {
        const result = await updateVariantMutation({
          variables: {
            id: variantId,
            productId,
            input,
          },
        });

        if (result.data?.updateVariant) {
          toast.success(t('savedChangesTitle'), {
            description: t('variantUpdated'),
          });
          return result.data.updateVariant;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [updateVariantMutation, t],
  );

  return {
    addVariant,
    updateVariant,
    isAdding,
    isUpdating,
    error: addError || updateError || null,
  };
}
