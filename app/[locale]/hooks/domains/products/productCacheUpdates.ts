import type { ApolloCache } from '@apollo/client';
import {
  FindAllProductsDocument,
  FindProductByIdDocument,
  type FindAllProductsQuery,
  type FindProductByIdQuery,
  type UpdateMutation,
  type UpdateMutationVariables,
} from '@graphql/generated';

type UpdatedProduct = UpdateMutation['updateProduct'];

interface ProductUpdateCacheContext {
  productId: string;
  updatedProduct: UpdatedProduct;
}

export function updateProductDetailCacheFromMutation(
  cache: ApolloCache,
  data: UpdateMutation | null | undefined,
  variables: UpdateMutationVariables | undefined,
): ProductUpdateCacheContext | null {
  if (!data?.updateProduct || !variables?.id) {
    return null;
  }

  const context = {
    productId: variables.id,
    updatedProduct: data.updateProduct,
  };

  updateProductDetailCache(cache, context.productId, context.updatedProduct);
  return context;
}

export function updateProductDetailCache(
  cache: ApolloCache,
  productId: string,
  updatedProduct: UpdatedProduct,
) {
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
}

export function updateProductArchiveState(
  cache: ApolloCache,
  productId: string,
  isArchived: boolean,
) {
  cache.modify({
    id: cache.identify({ __typename: 'Product', id: productId }),
    fields: {
      isArchived: () => isArchived,
    },
  });

  const queryVariants = [{ type: null }, {}, undefined];

  queryVariants.forEach((queryVariables) => {
    try {
      cache.updateQuery<FindAllProductsQuery>(
        {
          query: FindAllProductsDocument,
          variables: queryVariables,
        },
        (existingData) => {
          if (!existingData?.getAllProducts?.products) {
            return existingData;
          }

          return {
            ...existingData,
            getAllProducts: {
              ...existingData.getAllProducts,
              products: existingData.getAllProducts.products.map((product) =>
                product.id === productId ? { ...product, isArchived } : product,
              ),
            },
          };
        },
      );
    } catch (_error) {
      console.debug('Cache update skipped for variables:', queryVariables);
    }
  });
}
