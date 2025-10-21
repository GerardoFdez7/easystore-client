'use client';

import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '@hooks/utils/useDebounce';
import {
  useCategoriesForPicker,
  type CategoryPickerSummary,
} from './useCategoriesForPicker';
import { ComboboxOption } from '@shadcn/ui/combobox';
import { SortBy, SortOrder } from '@graphql/generated';

interface UseCategoryComboboxOptions {
  searchTerm?: string;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export const useCategoryCombobox = (
  hookOptions: UseCategoryComboboxOptions = {},
) => {
  const {
    searchTerm: initialSearchTerm = '',
    limit = 25,
    sortBy = SortBy.Name,
    sortOrder = SortOrder.Asc,
  } = hookOptions;

  // Local state
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Use the categories picker hook
  const {
    items: categories,
    loading,
    error,
    hasMore,
    total,
    handleLoadMore,
    resetPage,
  } = useCategoriesForPicker({
    name: debouncedSearchTerm,
    limit,
    sortBy,
    sortOrder,
    includeSubcategories: false,
  });

  // Transform categories to combobox options
  const options = useMemo<ComboboxOption[]>(() => {
    return categories.map((category: CategoryPickerSummary) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  // Update search term
  const updateSearchTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      // Reset pagination when search changes
      resetPage();
    },
    [resetPage],
  );

  // Load more function
  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      await handleLoadMore();
    }
  }, [hasMore, loading, handleLoadMore]);

  return {
    options,
    categories,
    searchTerm,
    updateSearchTerm,
    isInitialLoading: loading && categories.length === 0,
    isLoadingMore: loading && categories.length > 0,
    hasMore,
    total,
    loadMore,
    error,
  };
};
