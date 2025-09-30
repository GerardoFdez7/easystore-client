'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindAllVariantsToCreateStockDocument,
  FindAllVariantsToCreateStockQuery,
  FindAllVariantsToCreateStockQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import { useInfiniteScroll } from '@hooks/utils/useInfiniteScroll';

interface UseVariantSelectorOptions {
  limit?: number;
}

interface VariantSelectorProduct {
  name: string;
  variants: Array<{
    id: string;
    sku: string;
    attributes: Array<{ key: string; value: string }>;
  }>;
}

interface VariantWithProductName {
  id: string;
  sku?: string | null;
  attributes: Array<{ key: string; value: string }>;
  productName: string;
}

export const useVariantSelector = (options: UseVariantSelectorOptions = {}) => {
  const { limit = 10 } = options;

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [includeSoftDeleted, setIncludeSoftDeleted] = useState(false);

  // Stable callback functions for infinite scroll
  const getItems = useCallback(
    (data: FindAllVariantsToCreateStockQuery | undefined) => {
      const products = data?.getAllProducts?.products || [];
      return products.flatMap((product) =>
        (product.variants || []).map((variant) => ({
          ...variant,
          productName: product.name,
        })),
      );
    },
    [],
  );

  const getHasMore = useCallback(
    (data: FindAllVariantsToCreateStockQuery | undefined) =>
      data?.getAllProducts?.hasMore || false,
    [],
  );

  const getTotal = useCallback(
    (data: FindAllVariantsToCreateStockQuery | undefined) =>
      data?.getAllProducts?.total || 0,
    [],
  );

  // Infinite scroll hook
  const {
    page,
    allItems: variants,
    isLoadingMore,
    hasMore,
    total,
    loadMore: infiniteLoadMore,
    resetPagination,
    handleDataUpdate,
  } = useInfiniteScroll<
    FindAllVariantsToCreateStockQuery,
    FindAllVariantsToCreateStockQueryVariables
  >({
    getItems,
    getHasMore,
    getTotal,
  });

  // Query variables
  const variables: FindAllVariantsToCreateStockQueryVariables = useMemo(
    () => ({
      page,
      limit,
      name: searchTerm || undefined,
      sortBy,
      sortOrder,
      includeSoftDeleted,
    }),
    [page, limit, searchTerm, sortBy, sortOrder, includeSoftDeleted],
  );

  // Query
  const { data, loading, error, fetchMore } = useQuery(
    FindAllVariantsToCreateStockDocument,
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

  // Processed products with filtered variants
  const products: VariantSelectorProduct[] = useMemo(() => {
    if (!variants || variants.length === 0) return [];

    // Group variants by product
    const productMap = new Map<string, VariantSelectorProduct>();

    (variants as VariantWithProductName[]).forEach((variant) => {
      const productName = variant.productName || 'Unknown Product';

      if (!productMap.has(productName)) {
        productMap.set(productName, {
          name: productName,
          variants: [],
        });
      }

      const product = productMap.get(productName);
      if (product) {
        product.variants.push({
          id: variant.id,
          sku: variant.sku || '',
          attributes: variant.attributes || [],
        });
      }
    });

    return Array.from(productMap.values());
  }, [variants]);

  // Data provided by infinite scroll hook: hasMore, total

  // Actions
  const handleLoadMore = useCallback(async () => {
    if (hasMore && !loading && !isLoadingMore && fetchMore) {
      // Create a wrapper to match the expected signature
      const fetchMoreWrapper = async (
        options: Parameters<
          NonNullable<
            useQuery.Result<FindAllVariantsToCreateStockQuery>['fetchMore']
          >
        >[0],
      ) => {
        const result = await fetchMore(options);
        return result as useQuery.Result<FindAllVariantsToCreateStockQuery>;
      };
      await infiniteLoadMore(fetchMoreWrapper, variables, loading);
    }
  }, [hasMore, loading, isLoadingMore, infiniteLoadMore, fetchMore, variables]);

  const resetAndSearch = useCallback(() => {
    resetPagination();
  }, [resetPagination]);

  const updateSearchTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      resetPagination();
    },
    [resetPagination],
  );

  const updateSortBy = useCallback(
    (newSortBy: SortBy) => {
      setSortBy(newSortBy);
      resetPagination();
    },
    [resetPagination],
  );

  const updateSortOrder = useCallback(
    (newSortOrder: SortOrder) => {
      setSortOrder(newSortOrder);
      resetPagination();
    },
    [resetPagination],
  );

  const updateIncludeSoftDeleted = useCallback(
    (include: boolean) => {
      setIncludeSoftDeleted(include);
      resetPagination();
    },
    [resetPagination],
  );

  return {
    // State
    searchTerm,
    sortBy,
    sortOrder,
    includeSoftDeleted,
    products,

    // Query state
    loading,
    error,
    isLoadingMore,
    hasMore,
    total,

    // Actions
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updateIncludeSoftDeleted,
    handleLoadMore,
    resetAndSearch,
  };
};
