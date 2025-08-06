import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';

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
  return (
    <TableRow className="bg-card hover:bg-hover border-b">
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
