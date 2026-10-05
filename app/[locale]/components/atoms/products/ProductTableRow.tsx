'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ProductStatus from '@atoms/products/ProductStatus';
import { formatMoney } from '@lib/utils/money';
import type { ProductListItem } from '@lib/types/product';

interface ProductTableRowProps {
  product: ProductListItem;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export function ProductTableRow({
  product,
  isSelected,
  onSelect,
}: ProductTableRowProps) {
  const router = useRouter();
  const t = useTranslations('Products');

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
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          aria-label={t('selectProduct', { name: product.name })}
        />
      </TableCell>
      <TableCell className="text-left">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src={product.cover}
              alt=""
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
        {product.variants?.[0]?.price
          ? formatMoney(product.variants[0].price)
          : '-'}
      </TableCell>
      <TableCell>{product.variants?.length}</TableCell>
      <TableCell>{product.categories?.[0]?.categoryName || '-'}</TableCell>
      <TableCell>
        <ProductStatus product={product} />
      </TableCell>
    </TableRow>
  );
}
