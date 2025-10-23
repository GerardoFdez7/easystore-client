'use client';

import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import SelectType from '@atoms/products/SelectType';
import SearchBar from '@atoms/shared/SearchBar';
import MultiSelectComboboxCategory from '@atoms/products/MultiSelectComboboxCategory';
import TabFilterProducts from '@atoms/products/TabFilterProducts';
import ProductSortBySelect from '@atoms/shared/ProductSortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import { FilterType } from '@lib/types/filter-mode-mapper';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import {
  InputMaybe,
  TypeEnum,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';

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
  // Sort props for cards mode
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  onSortByChange?: (sortBy: ProductSortBy) => void;
  onSortOrderChange?: (sortOrder: SortOrder) => void;
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
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
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
        {/* Sort controls for cards mode */}
        {viewMode === 'cards' && (
          <div className="flex w-full flex-row justify-between sm:hidden">
            <ProductSortBySelect
              value={sortBy}
              onChange={(value) => {
                if (onSortByChange && value) {
                  onSortByChange(value);
                }
              }}
            />
            <SortOrderSelect
              value={sortOrder}
              onChange={(value) => onSortOrderChange?.(value ?? SortOrder.Asc)}
            />
          </div>
        )}
        <div className="w-full sm:flex sm:flex-row sm:gap-2">
          <TabFilterProducts
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCount={selectedProducts.length}
            selectedProductIds={selectedProducts}
            isArchived={isArchived}
            onDeleteComplete={onDeleteComplete}
          />
          {viewMode === 'cards' && (
            <>
              {/* Desktop layout - ProductSortBySelect next to TabFilterProducts */}
              <ProductSortBySelect
                value={sortBy}
                className="hidden sm:flex"
                onChange={(value) => {
                  if (onSortByChange && value) {
                    onSortByChange(value);
                  }
                }}
                availableOptions={[
                  ProductSortBy.Name,
                  ProductSortBy.CreatedAt,
                  ProductSortBy.UpdatedAt,
                  ProductSortBy.FirstVariantPrice,
                  ProductSortBy.VariantCount,
                ]}
              />
            </>
          )}
        </div>

        {/* SortOrderSelect before SelectType on desktop for cards mode */}
        {viewMode === 'cards' && (
          <>
            <SortOrderSelect
              value={sortOrder}
              onChange={(value) => onSortOrderChange?.(value ?? SortOrder.Asc)}
              className="hidden sm:flex"
            />
          </>
        )}

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
