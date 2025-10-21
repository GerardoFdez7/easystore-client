'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@lib/graphql/generated';
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

  const handleRowClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TableRow className="cursor-pointer" onClick={handleRowClick}>
      <TableCell
        className="hover:bg-background cursor-default"
        onClick={handleCheckboxClick}
      >
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
          <span className="font-medium">{product.name}</span>
        </div>
      </TableCell>
      <TableCell>{product.variants?.[0]?.sku || '-'}</TableCell>
      <TableCell>
        {product.variants?.[0]?.price
          ? `${process.env.NEXT_PUBLIC_DEFAULT_CURRENCY}${product.variants[0].price}`
          : '-'}
      </TableCell>
      <TableCell>{product.variants?.length || 0}</TableCell>
      <TableCell>{product.categories?.[0]?.categoryName || '-'}</TableCell>
      <TableCell>
        <ProductStatus product={product} />
      </TableCell>
    </TableRow>
  );
}
