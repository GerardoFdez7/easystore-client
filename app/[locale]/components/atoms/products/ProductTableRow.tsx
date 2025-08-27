'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@consts/products';
import ProductStatus from '@atoms/products/ProductStatus';

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export function ProductTableRow({
  product,
  isSelected,
  onSelect,
}: ProductTableRowProps) {
  const router = useRouter();

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on checkbox
    if (
      (e.target as HTMLElement).closest('input[type="checkbox"]') ||
      (e.target as HTMLElement).closest('[role="checkbox"]')
    ) {
      return;
    }

    // Create URL-friendly product name
    const productSlug = product.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    router.push(`/products/${productSlug}`);
  };

  return (
    <TableRow
      className="bg-card hover:bg-hover cursor-pointer border-b transition-colors"
      onClick={handleRowClick}
    >
      <TableCell className="px-3">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src={product.cover}
              alt={product.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-foreground">
        {product.variants?.[0]?.sku || 'N/A'}
      </TableCell>
      <TableCell className="text-foreground">
        {product.variants?.[0]?.price ? `$${product.variants[0].price}` : 'N/A'}
      </TableCell>
      <TableCell className="text-foreground">
        {product.variants?.length || 0}
      </TableCell>
      <TableCell className="text-foreground">
        {product.categories?.[0]?.categoryName || 'N/A'}
      </TableCell>
      <TableCell>
        <ProductStatus product={product} />
      </TableCell>
    </TableRow>
  );
}
