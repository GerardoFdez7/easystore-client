import { useCallback, useMemo } from 'react';
import {
  FindAllProductsDocument,
  FindAllProductsQuery,
  FindAllProductsQueryVariables,
} from '@graphql/generated';
import useQuery from '../../useQuery';

export const useGetAllProducts = (
  variables?: FindAllProductsQueryVariables,
) => {
  const defaultVariables = useMemo<FindAllProductsQueryVariables>(
    () => ({}),
    [],
  );

  const { data, isLoading, errors, refetch } = useQuery<
    FindAllProductsQuery,
    FindAllProductsQueryVariables
  >(FindAllProductsDocument, {
    ...defaultVariables,
    ...(variables || {}),
  });

  const products = useMemo(() => data?.getAllProducts?.products || [], [data]);

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
    isLoading,
    errors,
    refreshProducts,
    total: data?.getAllProducts?.total || 0,
  };
};
