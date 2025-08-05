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

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  image: string;
}

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export function ProductTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <Table>
        <TableHeader className="text-[12px] sm:text-[14px]">
          <TableRow className="bg-card">
            <TableHead className="w-9 px-3">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="text-foreground text-center font-medium">
              Product
            </TableHead>
            <TableHead className="text-foreground font-medium">
              Status
            </TableHead>
            <TableHead className="text-foreground font-medium">
              Inventory
            </TableHead>
            <TableHead className="text-foreground font-medium">
              Category
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
