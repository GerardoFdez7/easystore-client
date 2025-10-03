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

export type UseCategoriesTreeOptions = {
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

type GqlCategoryTree = NonNullable<
  FindCategoriesTreeQuery['getAllCategories']
>['categories'][number];

export type CategoryTreeNode = {
  id: string;
  name: string;
  parentId?: string | null;
  count?: number;
  subCategories?: CategoryTreeNode[];
};

const mapToTreeNode = (c: GqlCategoryTree): CategoryTreeNode => ({
  id: c.id,
  name: c.name,
  parentId: c.parentId,
  subCategories: c.subCategories?.map(mapToTreeNode) || [],
});

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
