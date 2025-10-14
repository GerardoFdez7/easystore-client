'use client';

import { ProductTable } from '@molecules/products/ProductTable';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState, useCallback } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { InputMaybe, TypeEnum } from '@graphql/generated';
import { PackageOpen, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import EmptyState from '@molecules/shared/EmptyState';
import { useProductCreation } from '@lib/contexts/ProductCreationContext';

export default function MainDashboard() {
  const t = useTranslations('Products');
  const router = useRouter();
  const { clearAllDrafts } = useProductCreation();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [typeFilter, setTypeFilter] = useState<InputMaybe<TypeEnum>>();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the products context instead of the hook directly
  const { products, refreshProducts } = useProductsContext();

  // Get the archived status of selected products
  const selectedProductsAreArchived = selectedProducts.map(
    (id) => products?.find((p) => p.id === id)?.isArchived ?? false,
  );

  // Callback to clear selection after bulk operations
  const handleClearSelection = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  //Search
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      void refreshProducts({
        page: 1,
        limit: 10,
        includeSoftDeleted: true,
        name: term || null,
        type: typeFilter || null,
      });
    },
    [refreshProducts, typeFilter],
  );

  // Handle type filter change
  const handleTypeFilterChange = useCallback(
    (type: InputMaybe<TypeEnum>) => {
      setTypeFilter(type);
      void refreshProducts({
        page: 1,
        limit: 10,
        includeSoftDeleted: true,
        name: searchTerm || null,
        type: type || null,
      });
    },
    [refreshProducts, searchTerm],
  );

  // Handle category filter change
  const handleCategoryFilterChange = useCallback(
    (category: string) => {
      setCategoryFilter(category);
      // TODO: Add category filter to refreshProducts when backend supports it
      void refreshProducts({
        page: 1,
        limit: 10,
        includeSoftDeleted: true,
        name: searchTerm || null,
        type: typeFilter || null,
      });
    },
    [refreshProducts, searchTerm, typeFilter],
  );

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && products) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'cards' : 'table');
  };

  // Only show EmptyState when there are NO products in DB and NO active filters
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    typeFilter !== undefined ||
    categoryFilter !== '';
  const hasNoProductsInDatabase =
    (!products || products.length === 0) && !hasActiveFilters;

  return (
    <main className="m-2 2xl:m-5">
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
            onSearch={handleSearch}
          />

          {viewMode === 'table' ? (
            <ProductTable
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              products={products}
              selectedProducts={selectedProducts}
              isArchived={selectedProductsAreArchived}
              onSelectProduct={handleProductSelect}
              onSelectAll={handleSelectAll}
              onDeleteComplete={handleClearSelection}
            />
          ) : (
            <ProductGrid
              products={products}
              selectedProducts={selectedProducts}
              onSelectProduct={handleProductSelect}
            />
          )}
        </>
      )}
    </main>
  );
}
