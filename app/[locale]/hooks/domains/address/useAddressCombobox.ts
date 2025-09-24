'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { useInfiniteScroll } from '@hooks/utils/useInfiniteScroll';
import {
  FindAllAddressesDocument,
  type FindAllAddressesQuery,
  type FindAllAddressesQueryVariables,
} from '@graphql/generated';

interface UseAddressComboboxReturn {
  // Data
  addresses: NonNullable<FindAllAddressesQuery['getAllAddresses']>['addresses'];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  total: number;

  // Search functionality
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Formatted options for combobox
  addressOptions: Array<{
    value: string;
    label: string;
    address: NonNullable<
      FindAllAddressesQuery['getAllAddresses']
    >['addresses'][0];
  }>;

  // Pagination
  page: number;
  loadMore: () => Promise<void>;
  isLoadingMore: boolean;

  // Actions
  refetch: () => Promise<void>;
}

export function useAddressCombobox(): UseAddressComboboxReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Initialize infinite scroll hook
  const {
    page,
    allItems: addresses,
    isLoadingMore,
    hasMore,
    total,
    loadMore: infiniteLoadMore,
    resetPagination,
    handleDataUpdate,
  } = useInfiniteScroll<FindAllAddressesQuery, FindAllAddressesQueryVariables>({
    getItems: (data: FindAllAddressesQuery | undefined) =>
      data?.getAllAddresses?.addresses || [],
    getHasMore: (data: FindAllAddressesQuery | undefined) =>
      data?.getAllAddresses?.hasMore || false,
    getTotal: (data: FindAllAddressesQuery | undefined) =>
      data?.getAllAddresses?.total || 0,
  });

  // Query variables for searching addresses
  const variables: FindAllAddressesQueryVariables = useMemo(
    () => ({
      name: debouncedSearchTerm || undefined,
      page,
      limit: 25, // Reasonable limit for pagination
    }),
    [debouncedSearchTerm, page],
  );

  // Query for addresses
  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
    fetchMore,
  } = useQuery(FindAllAddressesDocument, {
    variables,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  // Connect query data to infinite scroll
  useEffect(() => {
    if (data) {
      handleDataUpdate(data, page);
    }
  }, [data, page, handleDataUpdate]);

  // Derived data - removed since we get addresses from infinite scroll hook

  // Format address display for combobox
  const formatAddressDisplay = useCallback(
    (
      address: NonNullable<
        FindAllAddressesQuery['getAllAddresses']
      >['addresses'][0],
    ) => {
      const parts = [
        address.name,
        address.addressLine1,
        address.city,
        address.postalCode,
      ].filter(Boolean);

      return parts.join(', ');
    },
    [],
  );

  // Create options for combobox
  const addressOptions = useMemo(
    () =>
      (
        addresses as NonNullable<
          FindAllAddressesQuery['getAllAddresses']
        >['addresses']
      ).map((address) => ({
        value: address.id,
        label: formatAddressDisplay(address),
        address,
      })),
    [addresses, formatAddressDisplay],
  );

  // Load more function for infinite scroll
  const loadMore = useCallback(async () => {
    if (fetchMore && !loading) {
      // Create a wrapper to match the expected signature
      const fetchMoreWrapper = async (
        options: Parameters<
          NonNullable<useQuery.Result<FindAllAddressesQuery>['fetchMore']>
        >[0],
      ) => {
        const result = await fetchMore(options);
        return result as useQuery.Result<FindAllAddressesQuery>;
      };
      await infiniteLoadMore(fetchMoreWrapper, variables, loading);
    }
  }, [infiniteLoadMore, fetchMore, variables, loading]);

  // Reset pagination when search term changes
  const handleSetSearchTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      resetPagination();
    },
    [resetPagination],
  );

  // Refetch function
  const refetch = useCallback(async () => {
    try {
      resetPagination();
      await apolloRefetch();
    } catch (err) {
      console.error('Error refetching addresses:', err);
    }
  }, [apolloRefetch, resetPagination]);

  return {
    // Data
    addresses: addresses as NonNullable<
      FindAllAddressesQuery['getAllAddresses']
    >['addresses'],
    loading,
    error: error || null,
    hasMore,
    total,

    // Search functionality
    searchTerm,
    setSearchTerm: handleSetSearchTerm,

    // Formatted options
    addressOptions,

    // Pagination
    page,
    loadMore,
    isLoadingMore,

    // Actions
    refetch,
  };
}
