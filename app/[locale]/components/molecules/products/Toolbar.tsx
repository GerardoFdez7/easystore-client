'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import { FilterDropdown } from '@atoms/products/FilterDropdown';
import { SearchBar } from '@atoms/products/SearchBar';

interface ProductsToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  viewMode: 'table' | 'cards';
  onViewModeToggle: () => void;
}

export function ProductsToolbar({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onViewModeToggle,
}: ProductsToolbarProps) {
  const statusOptions = [
    { value: 'status', label: 'Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const categoryOptions = [
    { value: 'category', label: 'Category' },
    { value: 'home-kitchen', label: 'Home & Kitchen' },
    { value: 'electronics', label: 'Electronics' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex w-full justify-end">
        <ButtonAddProduct />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* SearchBar + Filters container (only visible on large screens) */}
        <div className="flex flex-col gap-4 xl:flex-1 xl:flex-row xl:items-center">
          <SearchBar
            placeholder="Search products"
            value={searchValue}
            onChange={onSearchChange}
          />
          {/* Filters only visible on large screens within this container */}
          <div className="hidden gap-4 xl:ml-4 xl:flex">
            <FilterDropdown
              placeholder="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              width="w-32"
            />
            <FilterDropdown
              placeholder="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              width="w-36"
            />
          </div>
        </div>

        {/* Filters and button container for small/medium screens */}
        <div className="flex flex-row items-center justify-between gap-1 xl:justify-end">
          {/* Filters visible only on small/medium screens */}
          <div className="flex gap-1 sm:gap-4 xl:hidden">
            <FilterDropdown
              placeholder="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              width="w-32"
            />
            <FilterDropdown
              placeholder="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              width="w-36"
            />
          </div>
          <div className="flex justify-end">
            <ButtonViewMode onViewModeToggle={onViewModeToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}
