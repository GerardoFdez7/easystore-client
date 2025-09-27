import { useCallback, useMemo } from 'react';
import {
  FindAllProductsDocument,
  FindAllProductsQuery,
  FindAllProductsQueryVariables,
} from '@graphql/generated';
import { useQuery } from '@apollo/client/react';

export const useGetAllProducts = (
  variables?: FindAllProductsQueryVariables,
) => {
  const defaultVariables = useMemo<FindAllProductsQueryVariables>(
    () => ({}),
    [],
  );

  const { data, loading, error, refetch } = useQuery<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >(FindAllProductsDocument, {
    variables: {
      ...defaultVariables,
      ...(variables || { type: null }),
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true, // Changed to true to update loading states
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

  return {
    products,
    loading,
    error,
    refetch,
    refreshProducts,
    total: data?.getAllProducts?.total || 0,
  };
};
