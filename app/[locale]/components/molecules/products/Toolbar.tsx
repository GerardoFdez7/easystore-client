'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import SelectType from '@atoms/products/SelectType';
import SearchBar from '@atoms/shared/SearchBar';
import MultiSelectComboboxCategory from '@atoms/products/MultiSelectComboboxCategory';
import TabFilterProducts from '@atoms/products/TabFilterProducts';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { InputMaybe, TypeEnum } from '@graphql/generated';

interface ProductsToolbarProps {
  typeFilter?: InputMaybe<TypeEnum>;
  onTypeFilterChange?: (value: InputMaybe<TypeEnum>) => void;
  categoryFilter?: string[];
  onCategoryFilterChange?: (value: string[]) => void;
  viewMode: string;
  onViewModeToggle: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  selectedProducts: string[];
  isArchived?: boolean | boolean[];
  onDeleteComplete?: () => void;
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
  selectedFilter,
  setSelectedFilter,
  selectedProducts,
  isArchived,
  onDeleteComplete,
}: ProductsToolbarProps) {
  const t = useTranslations('Products');

  return (
    <section className="flex w-full flex-col gap-4">
      {/* Add Product Button */}
      <div className="flex w-full justify-end">
        <ButtonAddProduct />
      </div>

      {/* Search and View Mode - responsive layout */}
      <div className="flex w-full flex-row gap-2">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearch}
          placeholder={t('searchProducts')}
          className="w-full"
        />
        <ButtonViewMode
          onViewModeToggle={onViewModeToggle}
          viewMode={viewMode}
        />
      </div>

      {/* Type and Category Filters - responsive layout */}
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <div className="w-full">
          <TabFilterProducts
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCount={selectedProducts.length}
            selectedProductIds={selectedProducts}
            isArchived={isArchived}
            onDeleteComplete={onDeleteComplete}
          />
        </div>
        <SelectType
          value={typeFilter}
          onValueChange={onTypeFilterChange}
          className="w-full sm:w-auto"
        />
        <MultiSelectComboboxCategory
          value={categoryFilter}
          onValueChange={onCategoryFilterChange}
        />
      </div>
    </section>
  );
});
