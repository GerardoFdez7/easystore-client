import { useCallback, useMemo } from 'react';
import {
  FindAllProductsDocument,
  FindAllProductsQuery,
  FindAllProductsQueryVariables,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';
import { useQuery } from '@apollo/client/react';

export const useGetAllProducts = (
  variables?: FindAllProductsQueryVariables,
) => {
  const defaultVariables = useMemo<FindAllProductsQueryVariables>(
    () => ({
      sortBy: ProductSortBy.UpdatedAt,
      sortOrder: SortOrder.Desc,
    }),
    [],
  );

  const { data, loading, error, refetch, fetchMore } = useQuery<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >(FindAllProductsDocument, {
    variables: {
      ...defaultVariables,
      ...(variables || { type: null }),
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const products = useMemo(() => {
    // If there's an error but we have no data, return empty array
    if (error && !data?.getAllProducts?.products?.length) {
      return [];
    }
    return data?.getAllProducts?.products || [];
  }, [data, error]);

  const refreshProducts = useCallback(
    (newVariables?: FindAllProductsQueryVariables) => {
      return refetch({
        ...defaultVariables,
        ...(newVariables || {}),
      } as FindAllProductsQueryVariables);
    },
    [refetch, defaultVariables],
  );

  // Calculate hasMore based on current page and total
  const hasMore = useMemo(() => {
    if (!data?.getAllProducts) return false;
    const currentPage = variables?.page || defaultVariables.page || 1;
    const limit = variables?.limit || defaultVariables.limit || 25;
    const total = data.getAllProducts.total || 0;
    return currentPage * limit < total;
  }, [data, variables, defaultVariables]);

  return {
    products,
    loading,
    error,
    refetch,
    refreshProducts,
    fetchMore,
    total: data?.getAllProducts?.total || 0,
    hasMore,
  };
};
