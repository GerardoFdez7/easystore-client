'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SortBy,
  SortOrder,
  type FindAllCategoriesQueryVariables,
} from '@graphql/generated';

export const categoryQueryOptions = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
} as const;

export interface CategoryPageOptions {
  page?: number;
  limit?: number;
  name?: string;
  parentId?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  includeSubcategories?: boolean;
}

export function useStableCategoryPageOptions(
  options: CategoryPageOptions,
): CategoryPageOptions {
  return useMemo(
    () => ({
      page: options.page,
      limit: options.limit,
      name: options.name,
      parentId: options.parentId,
      sortBy: options.sortBy,
      sortOrder: options.sortOrder,
      includeSubcategories: options.includeSubcategories,
    }),
    [
      options.page,
      options.limit,
      options.name,
      options.parentId,
      options.sortBy,
      options.sortOrder,
      options.includeSubcategories,
    ],
  );
}

export function createCategoryPageVariables(
  options: CategoryPageOptions,
  page: number,
  includeSubcategories: boolean | undefined,
): FindAllCategoriesQueryVariables {
  return {
    page,
    limit: options.limit ?? 25,
    name: options.name ?? '',
    parentId: options.parentId || null,
    sortBy: options.sortBy ?? SortBy.Name,
    sortOrder: options.sortOrder ?? SortOrder.Asc,
    includeSubcategories,
  };
}

export function selectCategoryItems<TCategory, TItem>(
  categories: TCategory[],
  select: ((list: TCategory[]) => TItem[]) | undefined,
  selectDefault: (category: TCategory) => TItem,
): TItem[] {
  return select ? select(categories) : categories.map(selectDefault);
}

export function getCategoryList<TCategory>(
  data:
    | {
        getAllCategories?: { categories: TCategory[] } | null;
      }
    | null
    | undefined,
): TCategory[] {
  return data?.getAllCategories?.categories ?? [];
}

interface UseCategoryPaginationOptions {
  initialPage: number;
  resetKey: string;
}

export function useCategoryPagination({
  initialPage,
  resetKey,
}: UseCategoryPaginationOptions) {
  const [page, setPage] = useState(initialPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (!isLoadingMore) {
      setPage(1);
    }
  }, [resetKey, isLoadingMore]);

  const loadNextPage = useCallback(
    async (
      hasMore: boolean,
      loading: boolean,
      fetchPage: (nextPage: number) => Promise<unknown>,
    ) => {
      if (!hasMore || loading || isLoadingMore) return;

      setIsLoadingMore(true);
      try {
        await fetchPage(page + 1);
        setPage((previousPage) => previousPage + 1);
      } catch (_error) {
        // Error handling is managed by Apollo Client error link
      } finally {
        setIsLoadingMore(false);
      }
    },
    [isLoadingMore, page],
  );

  return {
    page,
    isLoadingMore,
    loadNextPage,
    resetPage,
  };
}

interface UseCategoryLoadMoreOptions {
  hasMore: boolean;
  loading: boolean;
  fetchPage: (nextPage: number) => Promise<unknown>;
  loadNextPage: (
    hasMore: boolean,
    loading: boolean,
    fetchPage: (nextPage: number) => Promise<unknown>,
  ) => Promise<void>;
}

export function useCategoryLoadMore({
  hasMore,
  loading,
  fetchPage,
  loadNextPage,
}: UseCategoryLoadMoreOptions) {
  return useCallback(
    () => loadNextPage(hasMore, loading, fetchPage),
    [fetchPage, hasMore, loadNextPage, loading],
  );
}

interface CategoryQueryState<
  TCategory,
  TError,
  TRefetch,
  TFetchMore,
  TNetworkStatus,
> {
  data?: {
    getAllCategories?: {
      categories: TCategory[];
      total: number;
      hasMore: boolean;
    } | null;
  } | null;
  loading: boolean;
  error?: TError;
  refetch: TRefetch;
  fetchMore: TFetchMore;
  networkStatus: TNetworkStatus;
}

export function useCategoryResult<
  TItem,
  TCategory,
  TError,
  TRefetch,
  TFetchMore,
  TNetworkStatus,
>(
  items: TItem[],
  categories: TCategory[],
  query: CategoryQueryState<
    TCategory,
    TError,
    TRefetch,
    TFetchMore,
    TNetworkStatus
  >,
  pagination: ReturnType<typeof useCategoryPagination>,
  fetchPage: (nextPage: number) => Promise<unknown>,
  includeLoadingMoreInLoading: boolean,
) {
  const handleLoadMore = useCategoryLoadMore({
    hasMore: query.data?.getAllCategories?.hasMore ?? false,
    loading: query.loading,
    fetchPage,
    loadNextPage: pagination.loadNextPage,
  });

  return {
    items,
    raw: categories,
    total: query.data?.getAllCategories?.total ?? 0,
    hasMore: query.data?.getAllCategories?.hasMore ?? false,
    loading:
      query.loading ||
      (includeLoadingMoreInLoading && pagination.isLoadingMore),
    isLoadingMore: pagination.isLoadingMore,
    error: query.error,
    refetch: query.refetch,
    fetchMore: query.fetchMore,
    networkStatus: query.networkStatus,
    handleLoadMore,
    resetPage: pagination.resetPage,
    currentPage: pagination.page,
  };
}
