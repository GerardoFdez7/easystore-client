'use client';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { ProductTable } from '@molecules/products/ProductTable';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useTranslations } from 'next-intl';
import { useGetAllProducts } from '@hooks/products/useGetAllProducts';
import { TypeEnum, SortBy, SortOrder } from '@graphql/generated';
import { productsTest } from '@lib/consts/data-test';

export default function MainDashboard() {
  const t = useTranslations('Products');

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');

  const { products, loading, error, total } = useGetAllProducts({
    page: 1,
    limit: 10,
    type: TypeEnum.Physical,
    sortBy: SortBy.CreatedAt,
    sortOrder: SortOrder.Asc,
  });

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos</div>;

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(productsTest.map((p) => p.id));
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
        <SiderbarDashboard />
        <SidebarInset>
          <SiteHeader title={t('products')} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-5 py-4 md:gap-6 md:py-6">
                {/* Main Products */}
                <ProductsToolbar
                  typeFilter={typeFilter}
                  onTypeFilterChange={setTypeFilter}
                  categoryFilter={categoryFilter}
                  onCategoryFilterChange={setCategoryFilter}
                  viewMode={viewMode}
                  onViewModeToggle={toggleViewMode}
                />

                <div>
                  <p>Total de productos: {total}</p>
                  {products.map((product) => (
                    <div key={product.name}>
                      <h3>{product.name}</h3>
                      {/* Renderizar otros campos del producto */}
                    </div>
                  ))}
                </div>

                {viewMode === 'table' ? (
                  <ProductTable
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    products={productsTest}
                    selectedProducts={selectedProducts}
                    onSelectProduct={handleProductSelect}
                    onSelectAll={handleSelectAll}
                  />
                ) : (
                  <ProductGrid
                    products={productsTest}
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
