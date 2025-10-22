'use client';

import React from 'react';
import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { Product, ProductSortBy, SortOrder } from '@graphql/generated';
import { ProductTableRow } from '@atoms/products/ProductTableRow';
import TablePagination from '@molecules/shared/TablePagination';
import SortableHeader from '@atoms/shared/SortableHeader';
import { useTranslations } from 'next-intl';

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onAddProduct?: () => void;
  currentPage: number;
  totalPages: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  // Sort props
  sortBy: ProductSortBy;
  sortOrder: SortOrder;
  onSort: (column: ProductSortBy) => void;
}

export function ProductTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  currentPage,
  totalPages,
  totalRows,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  canPreviousPage,
  canNextPage,
  sortBy,
  sortOrder,
  onSort,
}: ProductTableProps) {
  const t = useTranslations('Products');

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="pl-2">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <SortableHeader<ProductSortBy>
              sortKey={ProductSortBy.Name}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={onSort}
            >
              {t('products')}
            </SortableHeader>
            <SortableHeader<ProductSortBy>
              sortKey={ProductSortBy.Sku}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={onSort}
            >
              SKU
            </SortableHeader>
            <SortableHeader<ProductSortBy>
              sortKey={ProductSortBy.FirstVariantPrice}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={onSort}
            >
              {t('price')}
            </SortableHeader>
            <SortableHeader<ProductSortBy>
              sortKey={ProductSortBy.VariantCount}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
              onSort={onSort}
            >
              {t('variants')}
            </SortableHeader>
            <TableHead>{t('category')}</TableHead>
            <TableHead>{t('status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={(checked) => onSelectProduct(product.id, checked)}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCount={selectedProducts.length}
        totalRows={totalRows}
        onPageChange={onPageChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </>
  );
}
