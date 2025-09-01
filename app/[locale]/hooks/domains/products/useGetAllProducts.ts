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

  const products = useMemo(() => {
    // If there's an error but we have no data, return empty array
    if (
      errors?.length &&
      !data?.getAllProducts?.products?.length &&
      data?.getAllProducts?.products?.length !== 0 &&
      data?.getAllProducts?.products !== null
    ) {
      return [];
    }
    return data?.getAllProducts?.products || [];
  }, [data, errors]);

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
