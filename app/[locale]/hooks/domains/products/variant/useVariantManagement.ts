'use client';

import { useCallback } from 'react';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  UpdateDocument,
  FindProductByIdDocument,
  FindProductByIdQuery,
  FindAllProductsDocument,
  FindAllProductsQuery,
  type UpdateMutation,
  type AddVariantToProductInput,
} from '@graphql/generated';

interface UseVariantManagementReturn {
  // CRUD operations
  addVariant: (
    productId: string,
    input: AddVariantToProductInput,
  ) => Promise<UpdateMutation['updateProduct'] | null>;

  updateVariant: (
    productId: string,
    variants: AddVariantToProductInput[],
  ) => Promise<UpdateMutation['updateProduct'] | null>;

  // Loading states
  isAdding: boolean;
  isUpdating: boolean;
  error: Error | null;
}

export function useVariantManagement(): UseVariantManagementReturn {
  const t = useTranslations('Products');
  const client = useApolloClient();

  // Use the product update mutation for all variant operations
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
                        ? { ...product, ...updatedProduct }
                        : product,
                  ),
                },
              };
            },
          );
        }
      },
    });

  // Variant operations using product update
  const addVariant = useCallback(
    async (
      productId: string,
      input: AddVariantToProductInput,
    ): Promise<UpdateMutation['updateProduct'] | null> => {
      try {
        // Read existing product data from cache to get current variants
        const existingProduct = client.readQuery<FindProductByIdQuery>({
          query: FindProductByIdDocument,
          variables: { id: productId },
        });

        // Get existing variants and map them to AddVariantToProductInput format
        const existingVariants =
          existingProduct?.getProductById?.variants?.map((variant) => ({
            sku: variant.sku,
            price: variant.price,
            condition: variant.condition,
            attributes: variant.attributes.map((attr) => ({
              key: attr.key,
              value: attr.value,
            })),
            dimension: variant.dimension
              ? {
                  height: variant.dimension.height,
                  width: variant.dimension.width,
                  length: variant.dimension.length,
                }
              : undefined,
            weight: variant.weight ?? undefined,
            barcode: variant.barcode ?? undefined,
            ean: variant.ean ?? undefined,
            isbn: variant.isbn ?? undefined,
            upc: variant.upc ?? undefined,
            personalizationOptions: variant.personalizationOptions ?? undefined,
            installmentPayments: variant.installmentPayments?.map((ip) => ({
              months: ip.months,
              interestRate: ip.interestRate,
            })),
            warranties: variant.warranties?.map((w) => ({
              months: w.months,
              coverage: w.coverage,
              instructions: w.instructions,
            })),
            variantCover: variant.variantCover ?? undefined,
            variantMedia: variant.variantMedia?.map((m) => ({
              url: m.url,
              mediaType: m.mediaType,
              position: m.position,
            })),
          })) ?? [];

        // Append new variant to existing ones
        const { data } = await updateProductMutation({
          variables: {
            id: productId,
            input: {
              variants: [...existingVariants, input],
            },
          },
        });

        if (data?.updateProduct) {
          toast.success(t('savedChangesTitle'));
          return data.updateProduct;
        }

        return null;
      } catch (error) {
        console.error('Error adding variant:', error);
        return null;
      }
    },
    [updateProductMutation, t, client],
  );

  const updateVariant = useCallback(
    async (
      productId: string,
      variants: AddVariantToProductInput[],
    ): Promise<UpdateMutation['updateProduct'] | null> => {
      try {
        const { data } = await updateProductMutation({
          variables: {
            id: productId,
            input: {
              variants,
            },
          },
        });

        if (data?.updateProduct) {
          toast.success(t('savedChangesTitle'), {
            description: t('variantUpdated'),
          });
          return data.updateProduct;
        }

        return null;
      } catch (error) {
        console.error('Error updating variants:', error);
        return null;
      }
    },
    [updateProductMutation, t],
  );

  return {
    addVariant,
    updateVariant,
    isAdding: isUpdating,
    isUpdating,
    error: updateError || null,
  };
}
