'use client';

import { useQuery } from '@apollo/client';
import {
  FindCategoryByIdDocument,
  FindCategoryByIdQuery,
  FindCategoryByIdQueryVariables,
} from '@graphql/generated';

export const useCategory = (id?: string) => {
  const { data, loading, error, refetch } = useQuery<
    FindCategoryByIdQuery,
    FindCategoryByIdQueryVariables
  >(FindCategoryByIdDocument, {
    variables: { id: id as string },
    skip: !id,
    fetchPolicy: 'cache-first',
  });

  return {
    category: data?.getCategoryById ?? null,
    loading,
    error,
    refetch,
  };
};

export default useCategory;
