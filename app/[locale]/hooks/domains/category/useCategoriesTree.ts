'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindCategoriesTreeDocument,
  FindCategoriesTreeQuery,
  FindCategoriesTreeQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

export interface UseCategoriesTreeOptions {
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

type GqlCategoryTree = NonNullable<
  FindCategoriesTreeQuery['getAllCategories']
>['categories'][number];

export interface CategoryTreeNode {
  id: string;
  name: string;
  parentId?: string | null;
  count?: number;
  subCategories?: CategoryTreeNode[];
}

const mapToTreeNode = (c: GqlCategoryTree): CategoryTreeNode => ({
  id: c.id,
  name: c.name,
  parentId: c.parentId,
  count: Array.isArray(c.subCategories) ? c.subCategories.length : 0,
  subCategories: c.subCategories?.map(mapToTreeNode) || [],
});

/**
 * Hook to fetch and manage hierarchical category tree data
 * @param opts - Options for sorting and filtering categories
 * @returns Category tree data with loading and error states
 */
export function useCategoriesTree(opts: UseCategoriesTreeOptions = {}) {
  const variables: FindCategoriesTreeQueryVariables = {
    sortBy: opts.sortBy ?? SortBy.Name,
    sortOrder: opts.sortOrder ?? SortOrder.Desc,
  };

  const { data, loading, error, refetch } = useQuery<
    FindCategoriesTreeQuery,
    FindCategoriesTreeQueryVariables
  >(FindCategoriesTreeDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const categories = useMemo(() => {
    const rawCategories = data?.getAllCategories?.categories ?? [];
    return rawCategories.map(mapToTreeNode);
  }, [data?.getAllCategories?.categories]);

  // Filter to only show parent categories (parentId is null)
  const parentCategories = useMemo(() => {
    return categories.filter((category) => !category.parentId);
  }, [categories]);

  return {
    categories: parentCategories,
    allCategories: categories,
    loading,
    error,
    refetch,
  };
}
