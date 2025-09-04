'use client';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import Sidebar from '@organisms/shared/Sidebar';
import { ProductTable } from '@molecules/products/ProductTable';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState, useCallback } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useTranslations } from 'next-intl';
import { useGetAllProducts } from '@hooks/domains/products/useGetAllProducts';

export default function MainDashboard() {
  const t = useTranslations('Products');

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useGetAllProducts({
    page: 1,
    limit: 10,
    includeSoftDeleted: true,
    name: searchTerm || undefined,
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
    <main className="pt-22 2xl:m-5">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <Sidebar />
        <SidebarInset>
          <SiteHeader title={t('products')} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-2 py-4 md:gap-6 md:py-6">
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
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
