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
  isArchived?: boolean | boolean[];
  onDeleteComplete?: () => void;
}

export default function ProductActions({
  selectedProductIds,
  isArchived = false,
  onDeleteComplete,
}: ProductActionsProps) {
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
            <ArchivedProduct
              productsIds={selectedProductIds}
              isArchived={isArchived}
              onSoftDeleteComplete={onDeleteComplete}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0">
          <div>
            <DeleteProduct
              productIds={selectedProductIds}
              onDeleteComplete={onDeleteComplete}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
