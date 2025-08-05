import { Checkbox } from '@shadcn/ui/checkbox';
import { TableCell, TableRow } from '@shadcn/ui/table';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  image: string;
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
              src={product.image || '/default.webp'}
              alt={product.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-foreground">{product.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-foreground">{product.status}</span>
      </TableCell>
      <TableCell>
        <span className="text-foreground">{product.inventory}</span>
      </TableCell>
      <TableCell>
        <span className="text-foreground">{product.category}</span>
      </TableCell>
    </TableRow>
  );
}
