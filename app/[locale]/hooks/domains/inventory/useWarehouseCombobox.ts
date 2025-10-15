'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { useInfiniteScroll } from '@hooks/utils/useInfiniteScroll';
import {
  FindWarehousesDocument,
  SortBy,
  SortOrder,
  type FindWarehousesQuery,
  type FindWarehousesQueryVariables,
} from '@graphql/generated';
import { ComboboxOption } from '@shadcn/ui/combobox';

type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

interface UseWarehouseComboboxOptions {
  searchTerm?: string;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export const useWarehouseCombobox = (
  hookOptions: UseWarehouseComboboxOptions = {},
) => {
  const {
    searchTerm: initialSearchTerm = '',
    limit = 10,
    sortBy = SortBy.Name,
    sortOrder = SortOrder.Asc,
  } = hookOptions;

  // Local state
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Infinite scroll hook
  const {
    allItems: warehouses,
    hasMore,
    total,
    page,
    loadMore,
    resetPagination,
    handleDataUpdate,
    isLoadingMore: infiniteScrollLoading,
  } = useInfiniteScroll<FindWarehousesQuery, FindWarehousesQueryVariables>({
    getItems: (data) => data?.getAllWarehouses?.warehouses || [],
    getHasMore: (data) => data?.getAllWarehouses?.hasMore || false,
    getTotal: (data) => data?.getAllWarehouses?.total || 0,
    mergeItems: (existing: unknown[], incoming: unknown[]) => {
      const existingWarehouses = existing as WarehouseType[];
      const incomingWarehouses = incoming as WarehouseType[];

      // Create a map of existing items by ID for efficient lookup
      const existingMap = new Map(
        existingWarehouses.map((item) => [item.id, item]),
      );

      // Add incoming items, avoiding duplicates
      incomingWarehouses.forEach((item) => {
        if (!existingMap.has(item.id)) {
          existingMap.set(item.id, item);
        }
      });

      // Return deduplicated array
      return Array.from(existingMap.values());
    },
  });

  // Query variables
  const variables: FindWarehousesQueryVariables = useMemo(
    () => ({
      page,
      limit,
      name: debouncedSearchTerm || undefined,
      sortBy,
      sortOrder,
    }),
    [page, limit, debouncedSearchTerm, sortBy, sortOrder],
  );

  // GraphQL query
  const { data, loading, error, refetch, fetchMore } = useQuery(
    FindWarehousesDocument,
    {
      variables,
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  // Connect query data to infinite scroll
  useEffect(() => {
    if (data) {
      handleDataUpdate(data, page);
    }
  }, [data, page, handleDataUpdate]);

  // Update search term and reset pagination
  const updateSearchTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      resetPagination();
    },
    [resetPagination],
  );

  // Handle load more with proper async handling
  const handleLoadMore = useCallback(async () => {
    if (fetchMore && hasMore && !infiniteScrollLoading && !loading) {
      await loadMore(
        (options) =>
          fetchMore(options) as Promise<useQuery.Result<FindWarehousesQuery>>,
        variables,
        loading,
      );
    }
  }, [loadMore, fetchMore, variables, loading, hasMore, infiniteScrollLoading]);

  // Convert warehouses to combobox options
  const comboboxOptions: ComboboxOption[] = useMemo(
    () =>
      (warehouses as WarehouseType[]).map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.name + (warehouse.city ? ` (${warehouse.city})` : ''),
      })),
    [warehouses],
  );

  // Loading states
  const isInitialLoading = loading && page === 1;
  const isLoadingMore = infiniteScrollLoading || (loading && page > 1);

  return {
    // Data
    warehouses: warehouses as WarehouseType[],
    options: comboboxOptions,
    total,
    hasMore,

    // Loading states
    loading,
    isInitialLoading,
    isLoadingMore,
    error,

    // Search
    searchTerm,
    updateSearchTerm,

    // Pagination
    page,
    loadMore: handleLoadMore,
    resetPagination,

    // Actions
    refetch,
  };
};
