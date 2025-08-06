'use client';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { ProductTable } from '@molecules/products/ProductTable';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { useState } from 'react';
import { ProductsToolbar } from '@molecules/products/Toolbar';

export default function MainDashboard() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('status');
  const [categoryFilter, setCategoryFilter] = useState('category');

  const products = [
    {
      id: '1',
      name: 'Phone',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/phone.webp',
      media: [
        {
          id: 'media_001',
          url: '/default.webp',
          position: 1,
          mediaType: 'IMAGE' as const,
        },
        {
          id: 'media_002',
          url: '/phone.webp',
          position: 2,
          mediaType: 'IMAGE' as const,
        },
      ],
    },
    {
      id: '2',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/default.webp',
      media: [
        {
          id: 'media_003',
          url: '/phone.webp',
          position: 1,
          mediaType: 'IMAGE' as const,
        },
      ],
    },
    {
      id: '3',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/phone.webp',
      media: [
        {
          id: 'media_004',
          url: '/default.webp',
          position: 1,
          mediaType: 'IMAGE' as const,
        },
        {
          id: 'media_005',
          url: '/phone.webp',
          position: 2,
          mediaType: 'IMAGE' as const,
        },
        {
          id: 'media_006',
          url: '/default.webp',
          position: 3,
          mediaType: 'IMAGE' as const,
        },
      ],
    },
    {
      id: '4',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/default.webp',
      // No media - only cover will be shown
    },
    {
      id: '5',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/phone.webp',
      media: [
        {
          id: 'media_007',
          url: '/default.webp',
          position: 1,
          mediaType: 'IMAGE' as const,
        },
        {
          id: 'media_008',
          url: '/phone.webp',
          position: 2,
          mediaType: 'IMAGE' as const,
        },
      ],
    },
    {
      id: '6',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/default.webp',
      media: [
        {
          id: 'media_009',
          url: '/phone.webp',
          position: 1,
          mediaType: 'IMAGE' as const,
        },
        {
          id: 'media_010',
          url: 'https://example.com/video.mp4',
          position: 2,
          mediaType: 'VIDEO' as const, // This will be filtered out
        },
      ],
    },
    {
      id: '7',
      name: 'Eco-Friendly Water Bottle',
      status: 'Active',
      inventory: 150,
      category: 'Home & Kitchen',
      cover: '/phone.webp',
      // No media - only cover will be shown
    },
  ];

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
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
        <SiderbarDashboard />
        <SidebarInset>
          <SiteHeader title="Products" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-5 py-4 md:gap-6 md:py-6">
                {/* Main Products */}
                <ProductsToolbar
                  searchValue={searchValue}
                  onSearchChange={setSearchValue}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  categoryFilter={categoryFilter}
                  onCategoryFilterChange={setCategoryFilter}
                  viewMode={viewMode}
                  onViewModeToggle={toggleViewMode}
                />

                {viewMode === 'table' ? (
                  <ProductTable
                    products={products}
                    selectedProducts={selectedProducts}
                    onSelectProduct={handleProductSelect}
                    onSelectAll={handleSelectAll}
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
