'use client';

import { useEffect, useMemo, useRef } from 'react';
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
  enabled?: boolean;
}

type FlatCategoryNode = {
  id: string;
  name: string;
  parentId?: string | null;
};

export interface CategoryTreeNode {
  id: string;
  name: string;
  parentId?: string | null;
  count?: number;
  subCategories?: CategoryTreeNode[];
}

function buildCategoryTree(categories: FlatCategoryNode[]): CategoryTreeNode[] {
  const nodes = new Map<string, CategoryTreeNode>();

  categories.forEach((category) => {
    nodes.set(category.id, {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      count: 0,
      subCategories: [],
    });
  });

  const roots: CategoryTreeNode[] = [];

  categories.forEach((category) => {
    const node = nodes.get(category.id);
    if (!node) return;
    const parent = category.parentId ? nodes.get(category.parentId) : undefined;

    if (parent) {
      parent.subCategories?.push(node);
      parent.count = parent.subCategories?.length ?? 0;
      return;
    }

    roots.push(node);
  });

  return roots;
}

/**
 * Hook to fetch and manage hierarchical category tree data
 * @param opts - Options for sorting and filtering categories
 * @returns Category tree data with loading and error states
 */
export function useCategoriesTree(opts: UseCategoriesTreeOptions = {}) {
  const variables = useMemo<FindCategoriesTreeQueryVariables>(
    () => ({
      page: 1,
      limit: 25,
      sortBy: opts.sortBy ?? SortBy.Name,
      sortOrder: opts.sortOrder ?? SortOrder.Desc,
    }),
    [opts.sortBy, opts.sortOrder],
  );

  const { data, loading, error, refetch, fetchMore } = useQuery<
    FindCategoriesTreeQuery,
    FindCategoriesTreeQueryVariables
  >(FindCategoriesTreeDocument, {
    variables,
    skip: opts.enabled === false,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const fetchedPages = useRef(new Set<number>());

  useEffect(() => {
    fetchedPages.current.clear();
  }, [variables.sortBy, variables.sortOrder]);

  useEffect(() => {
    const result = data?.getAllCategories;
    if (!result?.hasMore) return;

    const nextPage =
      Math.floor(result.categories.length / (variables.limit ?? 50)) + 1;
    if (fetchedPages.current.has(nextPage)) return;

    fetchedPages.current.add(nextPage);
    void fetchMore({
      variables: { ...variables, page: nextPage },
      updateQuery: (previous, { fetchMoreResult }) => {
        const next = fetchMoreResult.getAllCategories;
        if (!next) return previous;

        return {
          getAllCategories: {
            ...next,
            categories: [
              ...previous.getAllCategories.categories,
              ...next.categories,
            ],
          },
        };
      },
    });
  }, [data?.getAllCategories, fetchMore, variables]);

  const categories = useMemo(() => {
    return buildCategoryTree(data?.getAllCategories?.categories ?? []);
  }, [data?.getAllCategories?.categories]);

  return {
    categories,
    allCategories: categories,
    loading,
    error,
    refetch,
  };
}
