'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindAllVariantsToCreateStockDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

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

export const useVariantSelector = (options: UseVariantSelectorOptions = {}) => {
  const { limit = 10 } = options;

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [includeSoftDeleted, setIncludeSoftDeleted] = useState(false);
  const [allProducts, setAllProducts] = useState<
    Array<{
      name: string;
      variants?: Array<{
        id: string;
        sku?: string | null;
        attributes?: Array<{ key: string; value: string }> | null;
      }> | null;
    }>
  >([]);

  // GraphQL query
  const { data, loading, error, fetchMore } = useQuery(
    FindAllVariantsToCreateStockDocument,
    {
      variables: {
        page,
        limit,
        sortBy,
        sortOrder,
        includeSoftDeleted,
        name: searchTerm || '',
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );

  // Handle data updates when query completes
  useEffect(() => {
    if (data?.getAllProducts?.products) {
      if (page === 1) {
        // Reset products for new search/filter
        setAllProducts(data.getAllProducts.products);
      } else {
        // Append new products for pagination
        setAllProducts((prev) => [...prev, ...data.getAllProducts.products]);
      }
    }
  }, [data, page]);

  // Processed products with filtered variants
  const products: VariantSelectorProduct[] = useMemo(() => {
    if (!allProducts) return [];

    return allProducts
      .map((product) => ({
        name: product.name,
        variants:
          product.variants?.map((variant) => ({
            id: variant.id,
            sku: variant.sku || '',
            attributes: variant.attributes || [],
          })) || [],
      }))
      .filter((product) => product.variants.length > 0);
  }, [allProducts]);

  // Pagination and metadata
  const hasMore = data?.getAllProducts?.hasMore || false;
  const total = data?.getAllProducts?.total || 0;

  // Actions
  const handleLoadMore = async (): Promise<void> => {
    if (hasMore && !loading) {
      try {
        const result = await fetchMore({
          variables: {
            page: page + 1,
            limit,
            sortBy,
            sortOrder,
            includeSoftDeleted,
            name: searchTerm || '',
          },
        });

        if (result.data?.getAllProducts?.products) {
          setPage((prev) => prev + 1);
        }
      } catch (err) {
        console.error('Error loading more products:', err);
      }
    }
  };

  const resetAndSearch = (): void => {
    setPage(1);
    setAllProducts([]);
  };

  const updateSearchTerm = (term: string): void => {
    setSearchTerm(term);
    resetAndSearch();
  };

  const updateSortBy = (newSortBy: SortBy): void => {
    setSortBy(newSortBy);
    resetAndSearch();
  };

  const updateSortOrder = (newSortOrder: SortOrder): void => {
    setSortOrder(newSortOrder);
    resetAndSearch();
  };

  const updateIncludeSoftDeleted = (include: boolean): void => {
    setIncludeSoftDeleted(include);
    resetAndSearch();
  };

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
