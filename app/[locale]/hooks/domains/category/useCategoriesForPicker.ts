'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindCategoriesForPickerDocument,
  FindCategoriesForPickerQuery,
  FindCategoriesForPickerQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

export interface UseCategoriesForPickerOptions {
  page?: number;
  limit?: number;
  name?: string;
  parentId?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  includeSubcategories?: boolean;
}

type GqlCategory = NonNullable<
  FindCategoriesForPickerQuery['getAllCategories']
>['categories'][number];

// Minimal category summary for picker
export interface CategoryPickerSummary {
  id: string;
  name: string;
  cover?: string | '';
  count?: number;
}

interface UseCategoriesForPickerConfig<T> {
  select?: (list: GqlCategory[]) => T[];
}

const mapToPickerSummary = (c: GqlCategory): CategoryPickerSummary => ({
  id: c.id,
  name: c.name,
  cover: c.cover || '',
});

/**
 * Hook for fetching categories with minimal fields for picker components
 * @param opts - Options for filtering, sorting, and pagination
 * @param config - Configuration for data transformation
 * @returns Categories data with pagination and loading states
 */
export function useCategoriesForPicker<T = CategoryPickerSummary>(
  opts: UseCategoriesForPickerOptions = {},
  config?: UseCategoriesForPickerConfig<T>,
) {
  const [page, setPage] = useState(opts.page ?? 1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const variables: FindCategoriesForPickerQueryVariables = useMemo(
    () => ({
      page,
      limit: opts.limit ?? 25,
      name: opts.name ?? '',
      parentId: opts.parentId || null,
      sortBy: opts.sortBy ?? SortBy.Name,
      sortOrder: opts.sortOrder ?? SortOrder.Asc,
      includeSubcategories: opts.includeSubcategories ?? true,
    }),
    [
      page,
      opts.limit,
      opts.name,
      opts.parentId,
      opts.sortBy,
      opts.sortOrder,
      opts.includeSubcategories,
    ],
  );

  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery<
    FindCategoriesForPickerQuery,
    FindCategoriesForPickerQueryVariables
  >(FindCategoriesForPickerDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    context: {
      queryDeduplication: false,
    },
  });

  const list = useMemo(() => {
    const allCategories = (data?.getAllCategories?.categories ??
      []) as GqlCategory[];

    return allCategories;
  }, [data?.getAllCategories?.categories]);

  const select = config?.select;

  const items = useMemo<T[]>(() => {
    if (select) return select(list);
    return list.map(mapToPickerSummary) as unknown as T[];
  }, [list, select]);

  const handleLoadMore = useCallback(async () => {
    const hasMore = data?.getAllCategories?.hasMore ?? false;
    if (!hasMore || loading || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          page: page + 1,
          limit: opts.limit ?? 25,
          name: opts.name ?? '',
          parentId: opts.parentId || null,
          sortBy: opts.sortBy ?? SortBy.Name,
          sortOrder: opts.sortOrder ?? SortOrder.Asc,
          includeSubcategories: opts.includeSubcategories ?? true,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.getAllCategories?.categories) return prev;

          return {
            ...prev,
            getAllCategories: {
              ...prev.getAllCategories,
              categories: [
                ...(prev.getAllCategories?.categories || []),
                ...fetchMoreResult.getAllCategories.categories,
              ],
              hasMore: fetchMoreResult.getAllCategories.hasMore,
              total: fetchMoreResult.getAllCategories.total,
            },
          };
        },
      });
      setPage((prev) => prev + 1);
    } catch (_error) {
      // Error handling is managed by Apollo Client error link
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    data?.getAllCategories?.hasMore,
    loading,
    isLoadingMore,
    fetchMore,
    page,
    opts.limit,
    opts.name,
    opts.parentId,
    opts.sortBy,
    opts.sortOrder,
    opts.includeSubcategories,
  ]);

  // Reset page when search or filter options change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  // Reset page when options change
  const prevOptions = useMemo(
    () => ({
      name: opts.name,
      parentId: opts.parentId,
      sortBy: opts.sortBy,
      sortOrder: opts.sortOrder,
      includeSubcategories: opts.includeSubcategories,
    }),
    [
      opts.name,
      opts.parentId,
      opts.sortBy,
      opts.sortOrder,
      opts.includeSubcategories,
    ],
  );

  // Reset page when options change (but not during load more operations)
  React.useEffect(() => {
    if (!isLoadingMore) {
      setPage(1);
    }
  }, [
    prevOptions.name,
    prevOptions.parentId,
    prevOptions.sortBy,
    prevOptions.sortOrder,
    prevOptions.includeSubcategories,
    isLoadingMore,
  ]);

  return {
    items,
    raw: list,
    total: data?.getAllCategories?.total ?? 0,
    hasMore: data?.getAllCategories?.hasMore ?? false,
    loading: loading || isLoadingMore,
    error,
    refetch,
    fetchMore,
    networkStatus,
    handleLoadMore,
    resetPage,
    currentPage: page,
  };
}
