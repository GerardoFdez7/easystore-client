'use client';

import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  CreateProductDocument,
  UpdateDocument,
  FindProductByIdDocument,
  FindProductByIdQuery,
  type CreateProductMutation,
  type CreateProductMutationVariables,
  type UpdateMutation,
  type UpdateMutationVariables,
} from '@graphql/generated';

interface UseProductManagementReturn {
  // CRUD operations
  createProduct: (
    input: CreateProductMutationVariables['input'],
  ) => Promise<CreateProductMutation['createProduct'] | null>;

  updateProduct: (
    productId: string,
    input: UpdateMutationVariables['input'],
  ) => Promise<UpdateMutation['updateProduct'] | null>;

  // Loading states
  isCreating: boolean;
  isUpdating: boolean;
  error: Error | null;
}

export function useProductManagement(): UseProductManagementReturn {
  const t = useTranslations('Products');

  // Mutations with manual cache updates (more efficient than refetchQueries)
  const [createProductMutation, { loading: isCreating, error: createError }] =
    useMutation(CreateProductDocument, {
      errorPolicy: 'all',
      update: (cache, { data }) => {
        if (data?.createProduct) {
          // Invalidate products list cache - it will refetch when needed
          cache.evict({ fieldName: 'getAllProducts' });
        }
      },
    });

  const [updateProductMutation, { loading: isUpdating, error: updateError }] =
    useMutation(UpdateDocument, {
      errorPolicy: 'all',
      update: (cache, { data }, { variables }) => {
        if (data?.updateProduct && variables?.id) {
          const productId = variables.id;
          const updatedProduct = data.updateProduct;

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
                  ...updatedProduct,
                },
              };
            },
          );

          // Update the product in cache using cache.modify (works for all queries)
          cache.modify({
            id: cache.identify({ __typename: 'Product', id: productId }),
            fields: {
              name: () => updatedProduct.name,
              shortDescription: () => updatedProduct.shortDescription,
              longDescription: () => updatedProduct.longDescription,
              brand: () => updatedProduct.brand,
              manufacturer: () => updatedProduct.manufacturer,
              cover: () => updatedProduct.cover,
              productType: () => updatedProduct.productType,
              tags: () => updatedProduct.tags,
              categories: () => updatedProduct.categories,
              sustainabilities: () => updatedProduct.sustainabilities,
              media: () => updatedProduct.media,
              updatedAt: () => updatedProduct.updatedAt,
            },
          });
        }
      },
    });

  // CRUD operations
  const createProduct = useCallback(
    async (input: CreateProductMutationVariables['input']) => {
      try {
        const result = await createProductMutation({
          variables: {
            input,
          },
        });

        if (result.data?.createProduct) {
          toast.success(t('savedChangesTitle'), {
            description: t('productCreated'),
          });
          return result.data.createProduct;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [createProductMutation, t],
  );

  const updateProduct = useCallback(
    async (productId: string, input: UpdateMutationVariables['input']) => {
      if (!productId) {
        throw new Error('Product ID is required for update');
      }

      try {
        const result = await updateProductMutation({
          variables: {
            id: productId,
            input,
          },
        });

        if (result.data?.updateProduct) {
          toast.success(t('savedChangesTitle'), {
            description: t('productUpdated'),
          });
          return result.data.updateProduct;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [updateProductMutation, t],
  );

  return {
    createProduct,
    updateProduct,
    isCreating,
    isUpdating,
    error: createError || updateError || null,
  };
}
