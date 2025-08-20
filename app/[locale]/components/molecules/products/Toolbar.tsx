'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import { FilterDropdown } from '@atoms/products/FilterDropdown';
import { SearchBar } from '@atoms/shared/SearchBar';
import { useTranslations } from 'next-intl';
import { ComboboxCategory } from '@atoms/shared/ComboboxCategory';

interface ProductsToolbarProps {
  typeFilter?: string;
  onTypeFilterChange?: (value: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  viewMode: string;
  onViewModeToggle: () => void;
}

export function ProductsToolbar({
  typeFilter,
  onTypeFilterChange,
  viewMode,
  onViewModeToggle,
}: ProductsToolbarProps) {
  const t = useTranslations('Products');

  const typeOptions = [
    { value: 'physical', label: t('physical') },
    { value: 'digital', label: t('digital') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex w-full justify-end">
        <ButtonAddProduct />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* SearchBar + Filters container (only visible on large screens) */}
        <div className="flex flex-col gap-4 xl:flex-1 xl:flex-row xl:items-center">
          <div className="hidden gap-4 xl:ml-4 xl:flex">
            <FilterDropdown
              placeholder={t('type')}
              options={typeOptions}
              value={typeFilter}
              onChange={onTypeFilterChange}
              width="w-32"
            />

            {/*<FilterDropdown
              placeholder={t('category')}
              options={categoryOptions}
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              width="w-36"
            />*/}

            <ComboboxCategory />
          </div>
          <SearchBar placeholder={t('searchProducts')} />
          {/* Filters only visible on large screens within this container */}
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
            {/*<FilterDropdown
              placeholder={t('category')}
              options={categoryOptions}
              value={categoryFilter}
              onChange={onCategoryFilterChange}
              width="w-36"
            />*/}
          </div>
          <div className="flex justify-end">
            <ButtonViewMode
              onViewModeToggle={onViewModeToggle}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
