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
}

export function ProductTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  selectedFilter,
  setSelectedFilter,
}: ProductTableProps) {
  const t = useTranslations('Products');

  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <TabFilterProducts
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
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
    </div>
  );
}
