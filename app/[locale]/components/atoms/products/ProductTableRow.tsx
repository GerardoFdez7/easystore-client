'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@lib/graphql/generated';
import ProductStatus from '@atoms/products/ProductStatus';
import { formatPriceWithCommasAndDots } from '@lib/utils/input-formatters';

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
    <TableRow className="group cursor-pointer" onClick={handleRowClick}>
      <TableCell
        className="group-hover:bg-background cursor-default"
        onClick={handleCheckboxClick}
      >
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell className="text-left">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src={product.cover}
              alt={product.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">{product.name}</span>
            {product.variants?.[0]?.attributes?.[0] && (
              <span className="text-muted-foreground text-sm">
                {product.variants[0].attributes[0].key}:{' '}
                {product.variants[0].attributes[0].value}
              </span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>{product.variants?.[0].sku}</TableCell>
      <TableCell>
        {process.env.NEXT_PUBLIC_DEFAULT_CURRENCY}
        {product.variants?.[0]?.price
          ? formatPriceWithCommasAndDots(product.variants[0].price)
          : '0.00'}
      </TableCell>
      <TableCell>{product.variants?.length}</TableCell>
      <TableCell>{product.categories?.[0]?.categoryName || '-'}</TableCell>
      <TableCell>
        <ProductStatus product={product} />
      </TableCell>
    </TableRow>
  );
}
