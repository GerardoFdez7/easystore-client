'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { ProductTableRow } from '@atoms/products/ProductTableRow';
import TabFilterProducts from '@atoms/products/TabFilterProducts';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { useTranslations } from 'next-intl';
import { Product } from '@consts/products';

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  isArchived?: boolean | boolean[];
  onDeleteComplete?: () => void;
}

export function ProductTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  selectedFilter,
  setSelectedFilter,
  isArchived = false,
  onDeleteComplete,
}: ProductTableProps) {
  const t = useTranslations('Products');

  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <TabFilterProducts
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedCount={selectedProducts.length}
        selectedProductIds={selectedProducts}
        isArchived={isArchived}
        onDeleteComplete={onDeleteComplete}
      />

      <Table className="bg-card">
        <TableHeader className="text-[12px] sm:text-[14px]">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-9 px-3">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="text-foreground text-center font-medium">
              {t('products')}
            </TableHead>
            <TableHead className="text-foreground font-medium">SKU</TableHead>
            <TableHead className="text-foreground font-medium">
              {t('price')}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t('variants')}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t('category')}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t('status')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[12px] sm:text-[14px]">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={(checked) => onSelectProduct(product.id, checked)}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
