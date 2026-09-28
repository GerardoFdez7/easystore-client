'use client';

import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client/react';

interface UseInfiniteScrollOptions<TData> {
  /**
   * Initial page number (default: 1)
   */
  initialPage?: number;

  /**
   * Function to extract items from query data
   */
  getItems: (data: TData | undefined) => unknown[];

  /**
   * Function to extract hasMore flag from query data
   */
  getHasMore: (data: TData | undefined) => boolean;

  /**
   * Function to extract total count from query data
   */
  getTotal: (data: TData | undefined) => number;

  /**
   * Function to merge new items with existing ones
   */
  mergeItems?: (existing: unknown[], incoming: unknown[]) => unknown[];

  /**
   * Callback when search term or filters change (resets pagination)
   */
  onReset?: () => void;
}

interface UseInfiniteScrollReturn<TData, TVariables> {
  // State
  page: number;
  allItems: unknown[];
  isLoadingMore: boolean;

  // Computed values
  hasMore: boolean;
  total: number;

  // Actions
  loadMore: (
    fetchMore: (
      options: Parameters<NonNullable<useQuery.Result<TData>['fetchMore']>>[0],
    ) => Promise<useQuery.Result<TData>>,
    variables: TVariables,
    loading: boolean,
  ) => Promise<void>;

  resetPagination: () => void;

  handleDataUpdate: (data: TData | undefined, currentPage: number) => void;
}

export function useInfiniteScroll<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>({
  initialPage = 1,
  getItems,
  getHasMore,
  getTotal,
  mergeItems = (existing, incoming) => [...existing, ...incoming],
  onReset,
}: UseInfiniteScrollOptions<TData>): UseInfiniteScrollReturn<
  TData,
  TVariables
> {
  const [page, setPage] = useState<number>(initialPage);
  const [allItems, setAllItems] = useState<unknown[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<TData | undefined>(undefined);

  const handleDataUpdate = useCallback(
    (data: TData | undefined, currentPage: number) => {
      setCurrentData(data);

      if (!data) return;

      const newItems = getItems(data);

      if (currentPage === 1) {
        // Reset items for new search/filter
        setAllItems(newItems);
      } else {
        // Append new items for pagination
        setAllItems((prev) => mergeItems(prev, newItems));
      }

      setIsLoadingMore(false);
    },
    [getItems, mergeItems],
  );

  const hasMore = getHasMore(currentData);
  const total = getTotal(currentData);

  // Load more function
  const loadMore = useCallback(
    async (
      fetchMore: (
        options: Parameters<
          NonNullable<useQuery.Result<TData>['fetchMore']>
        >[0],
      ) => Promise<useQuery.Result<TData>>,
      variables: TVariables,
      loading: boolean,
    ) => {
      if (!hasMore || isLoadingMore || loading) return;

      setIsLoadingMore(true);

      try {
        const result = await fetchMore({
          variables: {
            ...variables,
            page: page + 1,
          } as TVariables,
        });

        if (result.data) {
          setPage((prev) => prev + 1);
          handleDataUpdate(result.data as TData, page + 1);
        }
      } catch (err) {
        console.error('Error loading more items:', err);
        setIsLoadingMore(false);
      }
    },
    [hasMore, isLoadingMore, page, handleDataUpdate],
  );

  // Reset pagination
  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setAllItems([]);
    setCurrentData(undefined);
    onReset?.();
  }, [initialPage, onReset]);

  return {
    // State
    page,
    allItems,
    isLoadingMore,

    // Computed values
    hasMore,
    total,

    // Actions
    loadMore,
    resetPagination,
    handleDataUpdate,
  };
}
