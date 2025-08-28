import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcn/ui/dropdown-menu';
import { Button } from '@shadcn/ui/button';
import { MoreHorizontal } from 'lucide-react';
import ArchivedProduct from './ArchivedProduct';
import DeleteProduct from './DeleteProduct';

interface ProductActionsProps {
  selectedProductIds: string[];
}

export default function ProductActions({
  selectedProductIds,
}: ProductActionsProps) {
  const handleArchive = () => {
    console.log('Archiving product...');
    // Aquí iría la lógica para archivar/desarchivar el producto
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild className="p-0">
          <div>
            <ArchivedProduct onConfirm={handleArchive} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0">
          <div>
            <DeleteProduct productIds={selectedProductIds} />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
