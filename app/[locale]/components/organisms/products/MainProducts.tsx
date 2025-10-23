'use client';

import { ProductTable } from '@molecules/products/ProductTable';
import ProductTableSkeleton from '@molecules/products/ProductTableSkeleton';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState, useCallback, useEffect } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import {
  FilterType,
  mapFilterTypeToProductFilterMode,
} from '@lib/types/filter-mode-mapper';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { InputMaybe, TypeEnum, ProductFilterMode } from '@graphql/generated';
import { PackageOpen, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import EmptyState from '@molecules/shared/EmptyState';
import { useProductCreation } from '@lib/contexts/ProductCreationContext';

const itemsPerPage = 25;

export default function MainDashboard() {
  const t = useTranslations('Products');
  const router = useRouter();
  const { clearAllDrafts } = useProductCreation();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<InputMaybe<TypeEnum>>();
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Use the products context instead of the hook directly
  const {
    products: allProducts,
    loading,
    refreshProducts,
    total,
    sortBy,
    sortOrder,
    handleSort,
    setSortOrder,
    hasMore,
    fetchMore,
    isLoadingMore,
    fetchPage,
    viewMode,
    setViewMode,
  } = useProductsContext();

  // Products are already filtered by the server based on filterMode
  const paginatedProducts = allProducts || [];

  const totalItems = total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Effect to refresh products when sort changes
  useEffect(() => {
    const filterMode = mapFilterTypeToProductFilterMode(selectedFilter);
    void refreshProducts({
      page: currentPage,
      limit: itemsPerPage,
      filterMode,
      name: searchTerm || null,
      type: typeFilter || null,
      categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
    });
  }, [
    sortBy,
    sortOrder,
    refreshProducts,
    currentPage,
    selectedFilter,
    searchTerm,
    typeFilter,
    categoryFilter,
  ]);

  // Pagination handlers
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSelectedProducts([]); // Clear selection when changing pages

      if (viewMode === 'table') {
        // Use fetchPage for table pagination
        const filterMode = mapFilterTypeToProductFilterMode(selectedFilter);
        void fetchPage(page, {
          filterMode,
          name: searchTerm || null,
          type: typeFilter || null,
          categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
        });
      } else {
        // For cards view, use refreshProducts to reset and start from page 1
        const filterMode = mapFilterTypeToProductFilterMode(selectedFilter);
        void refreshProducts({
          page: 1, // Always start from page 1 for cards view
          limit: itemsPerPage,
          filterMode,
          name: searchTerm || null,
          type: typeFilter || null,
          categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
        });
      }
    },
    [
      viewMode,
      fetchPage,
      refreshProducts,
      selectedFilter,
      searchTerm,
      typeFilter,
      categoryFilter,
    ],
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  const handleFirstPage = useCallback(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  const handleLastPage = useCallback(() => {
    handlePageChange(totalPages);
  }, [totalPages, handlePageChange]);

  // Get the archived status of selected products
  const selectedProductsAreArchived = selectedProducts.map(
    (id) => allProducts?.find((p) => p.id === id)?.isArchived ?? false,
  );

  // Callback to clear selection after bulk operations
  const handleClearSelection = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  // Handle search term change
  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1); // Reset to first page when searching
      void refreshProducts({
        page: 1,
        limit: itemsPerPage,
        filterMode: ProductFilterMode.All,
        name: term || null,
        type: typeFilter || null,
        categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
      });
    },
    [refreshProducts, typeFilter, categoryFilter],
  );

  // Handle type filter change
  const handleTypeFilterChange = useCallback(
    (type: InputMaybe<TypeEnum>) => {
      setTypeFilter(type);
      setCurrentPage(1); // Reset to first page when filtering
      void refreshProducts({
        page: 1,
        limit: itemsPerPage,
        filterMode: ProductFilterMode.All,
        name: searchTerm || null,
        type: type || null,
        categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
      });
    },
    [refreshProducts, searchTerm, categoryFilter],
  );

  // Handle category filter change
  const handleCategoryFilterChange = useCallback(
    (categories: string[]) => {
      setCategoryFilter(categories);
      setCurrentPage(1); // Reset to first page when filtering
      void refreshProducts({
        page: 1,
        limit: itemsPerPage,
        filterMode: ProductFilterMode.All,
        name: searchTerm || null,
        type: typeFilter || null,
        categoriesIds: categories.length > 0 ? categories : null,
      });
    },
    [refreshProducts, searchTerm, typeFilter],
  );

  // Handle tab filter change (All, Actives, Archived)
  const handleTabFilterChange = useCallback(
    (filter: FilterType) => {
      setSelectedFilter(filter);
      setCurrentPage(1); // Reset to first page when filtering

      const filterMode = mapFilterTypeToProductFilterMode(filter);

      void refreshProducts({
        page: 1,
        limit: itemsPerPage,
        filterMode,
        name: searchTerm || null,
        type: typeFilter || null,
        categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
      });
    },
    [refreshProducts, searchTerm, typeFilter, categoryFilter],
  );

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && paginatedProducts) {
      // Only select products on current page
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleViewMode = () => {
    const newViewMode = viewMode === 'table' ? 'cards' : 'table';
    setViewMode(newViewMode);

    // Reset pagination when switching view modes
    setCurrentPage(1);

    // Refresh products with current filters
    void refreshProducts({
      page: 1,
      limit: itemsPerPage,
      filterMode: mapFilterTypeToProductFilterMode(selectedFilter),
      name: searchTerm || null,
      type: typeFilter || null,
      categoriesIds: categoryFilter.length > 0 ? categoryFilter : null,
    });
  };

  // Only show EmptyState when there are NO products in DB and NO active filters
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    typeFilter !== undefined ||
    categoryFilter.length > 0 ||
    selectedFilter !== 'All';
  const hasNoProductsInDatabase =
    (!allProducts || allProducts.length === 0) && !hasActiveFilters;

  // Show filtered empty state when filters are active but no products match
  const hasFilteredEmptyState =
    hasActiveFilters && (!allProducts || allProducts.length === 0);

  return (
    <main className="flex w-full flex-col gap-4 px-4 xl:mx-auto">
      {hasNoProductsInDatabase ? (
        <EmptyState
          icon={PackageOpen}
          title={t('noProductsFound')}
          description={t('noProductsDescription')}
          buttonText={t('addProduct')}
          buttonIcon={Plus}
          onButtonClick={() => {
            clearAllDrafts();
            router.push('/products/new');
          }}
        />
      ) : (
        <>
          {/* Main Products */}
          <ProductsToolbar
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeFilterChange}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleCategoryFilterChange}
            viewMode={viewMode}
            onViewModeToggle={toggleViewMode}
            searchTerm={searchTerm}
            onSearch={handleSearchChange}
            selectedFilter={selectedFilter}
            setSelectedFilter={handleTabFilterChange}
            selectedProducts={selectedProducts}
            isArchived={selectedProductsAreArchived}
            onDeleteComplete={handleClearSelection}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={(newSortBy) => handleSort(newSortBy)}
            onSortOrderChange={(newSortOrder) => {
              setSortOrder(newSortOrder);
            }}
          />

          {hasFilteredEmptyState ? (
            <EmptyState
              icon={Search}
              title={t('noProductsMatchFilters')}
              description={t('noProductsMatchFiltersDescription')}
              buttonText={t('clearFilters')}
              onButtonClick={() => {
                setSearchTerm('');
                setTypeFilter(undefined);
                setCategoryFilter([]);
                setSelectedFilter('All');
                setCurrentPage(1);
                void refreshProducts({
                  page: 1,
                  limit: itemsPerPage,
                  filterMode: ProductFilterMode.All,
                  name: null,
                  type: null,
                  categoriesIds: null,
                });
              }}
            />
          ) : (
            <>
              {viewMode === 'table' ? (
                loading ? (
                  <ProductTableSkeleton />
                ) : (
                  <ProductTable
                    products={paginatedProducts}
                    selectedProducts={selectedProducts}
                    onSelectProduct={handleProductSelect}
                    onSelectAll={handleSelectAll}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalItems}
                    onPageChange={handlePageChange}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                    onFirstPage={handleFirstPage}
                    onLastPage={handleLastPage}
                    canPreviousPage={currentPage > 1}
                    canNextPage={currentPage < totalPages}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                )
              ) : (
                <ProductGrid
                  products={paginatedProducts}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={() => {
                    void fetchMore();
                  }}
                  isLoadingMore={isLoadingMore}
                />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
