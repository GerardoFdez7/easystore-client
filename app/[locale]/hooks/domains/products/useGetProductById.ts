import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  FindProductByIdDocument,
  FindProductByIdQuery,
  FindProductByIdQueryVariables,
} from '@graphql/generated';

export const useGetProductById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<
    FindProductByIdQuery,
    FindProductByIdQueryVariables
  >(FindProductByIdDocument, {
    variables: { id },
    skip: !id, // Skip the query if no ID is provided
  });

  const product = useMemo(() => {
    return data?.getProductById || null;
  }, [data]);

  return {
    product,
    loading,
    error,
    refetch: () => refetch({ id }), // Wrapper to ensure ID is always passed
  };
};
