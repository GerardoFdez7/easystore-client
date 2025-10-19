'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import ComboboxType from '@atoms/products/ComboboxType';
import SearchProduct from '@atoms/products/SearchProduct';
import ComboboxCategory from '@atoms/products/ComboboxCategory';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { InputMaybe, TypeEnum } from '@graphql/generated';

interface ProductsToolbarProps {
  typeFilter?: InputMaybe<TypeEnum>;
  onTypeFilterChange?: (value: InputMaybe<TypeEnum>) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  viewMode: string;
  onViewModeToggle: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const ProductsToolbar = memo(function ProductsToolbar({
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  viewMode,
  onViewModeToggle,
  searchTerm,
  onSearch,
}: ProductsToolbarProps) {
  const t = useTranslations('Products');

  return (
    <div className="space-y-6">
      <div className="flex w-full justify-end">
        <ButtonAddProduct />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* SearchBar + Filters container (only visible on large screens) */}
        <div className="flex flex-col gap-4 xl:flex-1 xl:flex-row xl:items-center">
          <div className="hidden gap-4 xl:ml-4 xl:flex">
            <ComboboxType
              value={typeFilter}
              onValueChange={onTypeFilterChange}
            />
            <ComboboxCategory
              value={categoryFilter}
              onValueChange={onCategoryFilterChange}
            />
          </div>
          <SearchProduct
            searchTerm={searchTerm}
            onSearchChange={onSearch}
            placeholder={t('searchProducts')}
          />
          {/* Filters only visible on large screens within this container */}
        </div>

        {/* Filters and button container for small/medium screens */}
        <div className="flex flex-row items-center justify-between gap-1 xl:justify-end">
          {/* Filters visible only on small/medium screens */}
          <div className="flex gap-1 sm:gap-4 xl:hidden">
            <ComboboxType
              value={typeFilter}
              onValueChange={onTypeFilterChange}
            />
            <ComboboxCategory
              value={categoryFilter}
              onValueChange={onCategoryFilterChange}
            />
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
});
