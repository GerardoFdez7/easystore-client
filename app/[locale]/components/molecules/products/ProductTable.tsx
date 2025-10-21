'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { ProductTableRow } from '@atoms/products/ProductTableRow';
import { useTranslations } from 'next-intl';
import { Product } from '@lib/graphql/generated';
import TablePagination from '@molecules/shared/TablePagination';

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
            <TableHead>{t('products')}</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>{t('price')}</TableHead>
            <TableHead>{t('variants')}</TableHead>
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
