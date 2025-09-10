'use client';

import { ProductTable } from '@molecules/products/ProductTable';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState, useCallback } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useGetAllProducts } from '@hooks/domains/products/useGetAllProducts';
import { InputMaybe, TypeEnum } from '@graphql/generated';

export default function MainDashboard() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [typeFilter, setTypeFilter] = useState<InputMaybe<TypeEnum>>();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useGetAllProducts({
    page: 1,
    limit: 10,
    includeSoftDeleted: true,
    name: searchTerm || null,
    type: typeFilter || null,
  });

  // Get the archived status of selected products
  const selectedProductsAreArchived = selectedProducts.map(
    (id) => products?.find((p) => p.id === id)?.isArchived ?? false,
  );
  const handleDeleteComplete = () => {
    setSelectedProducts([]);
  };

  //Search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

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

  return (
    <main className="m-2 2xl:m-5">
      {/* Main Products */}
      <ProductsToolbar
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
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
          onDeleteComplete={handleDeleteComplete}
        />
      ) : (
        <ProductGrid
          products={products}
          selectedProducts={selectedProducts}
          onSelectProduct={handleProductSelect}
        />
      )}
    </main>
  );
}
