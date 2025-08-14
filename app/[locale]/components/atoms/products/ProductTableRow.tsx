'use client';

import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MediaItem {
  id: string;
  url: string;
  position: number;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  cover: string; // Mandatory cover image
  media?: MediaItem[]; // Optional media array
}

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
      <TableCell className="text-foreground">{product.status}</TableCell>
      <TableCell className="text-foreground">{product.inventory}</TableCell>
      <TableCell className="text-foreground">{product.category}</TableCell>
    </TableRow>
  );
}
