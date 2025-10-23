'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

export interface UseCategoriesOptions {
  page?: number;
  limit?: number;
  name?: string;
  parentId?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  includeSubcategories?: boolean;
}

type GqlCategory = NonNullable<
  FindAllCategoriesQuery['getAllCategories']
>['categories'][number];

// Default Select
export interface CategorySummary {
  id: string;
  name: string;
  cover: string;
  count: number;
}

interface UseCategoriesConfig<T> {
  select?: (list: GqlCategory[]) => T[];
}

const mapToSummary = (c: GqlCategory): CategorySummary => ({
  id: c.id,
  name: c.name,
  cover: c.cover || '',
  count: Array.isArray(c.subCategories) ? c.subCategories.length : 0,
});

/**
 * Generic hook for fetching and managing categories with pagination
 * @param opts - Options for filtering, sorting, and pagination
 * @param config - Configuration for data transformation
 * @returns Categories data with pagination and loading states
 */
export function useCategories<T = CategorySummary>(
  opts: UseCategoriesOptions = {},
  config?: UseCategoriesConfig<T>,
) {
  const [page, setPage] = useState(opts.page ?? 1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const variables: FindAllCategoriesQueryVariables = useMemo(
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
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const list = useMemo(() => {
    const allCategories = (data?.getAllCategories?.categories ??
      []) as GqlCategory[];

    return allCategories;
  }, [data?.getAllCategories?.categories]);

  const select = config?.select;

  const items = useMemo<T[]>(() => {
    if (select) return select(list);
    return list.map(mapToSummary) as unknown as T[];
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

  // Track previous options to detect changes
  const prevOptions = useMemo(
    () => ({
      name: opts.name ?? '',
      parentId: opts.parentId || null,
      sortBy: opts.sortBy ?? SortBy.Name,
      sortOrder: opts.sortOrder ?? SortOrder.Asc,
      includeSubcategories: opts.includeSubcategories ?? true,
    }),
    [
      opts.name,
      opts.parentId,
      opts.sortBy,
      opts.sortOrder,
      opts.includeSubcategories,
    ],
  );

  // Reset page when options change (but not during load more)
  useEffect(() => {
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
    loading,
    isLoadingMore,
    error,
    refetch,
    fetchMore,
    networkStatus,
    handleLoadMore,
    resetPage,
    currentPage: page,
  };
}
