'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import { FilterDropdown } from '@atoms/products/FilterDropdown';
import { SearchBar } from '@atoms/products/SearchBar';
import { useTranslations } from 'next-intl';

interface ProductsToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  typeFilter?: string;
  onTypeFilterChange?: (value: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  viewMode: 'table' | 'cards';
  onViewModeToggle: () => void;
}

export function ProductsToolbar({
  searchValue,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onViewModeToggle,
}: ProductsToolbarProps) {
  const t = useTranslations('Products');

  const typeOptions = [
    { value: 'physical', label: t('physical') },
    { value: 'digital', label: t('digital') },
  ];

  const categoryOptions = [
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
            placeholder={t('searchProducts')}
            value={searchValue}
            onChange={onSearchChange}
          />
          {/* Filters only visible on large screens within this container */}
          <div className="hidden gap-4 xl:ml-4 xl:flex">
            <FilterDropdown
              placeholder={t('type')}
              options={typeOptions}
              value={typeFilter}
              onChange={onTypeFilterChange}
              width="w-32"
            />
            <FilterDropdown
              placeholder={t('category')}
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
              placeholder={t('type')}
              options={typeOptions}
              value={typeFilter}
              onChange={onTypeFilterChange}
              width="w-32"
            />
            <FilterDropdown
              placeholder={t('category')}
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
