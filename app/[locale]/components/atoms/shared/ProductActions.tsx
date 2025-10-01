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
import RestoreProduct from './RestoreProduct';
import DeleteProduct from './DeleteProduct';
import { useTranslations } from 'next-intl';

interface ProductActionsProps {
  selectedProductIds?: string[];
  isArchived?: boolean | boolean[];
  onDeleteComplete?: () => void;
  singleMode?: boolean;
  productId?: string;
  productIsArchived?: boolean;
}

export default function ProductActions({
  selectedProductIds,
  isArchived = false,
  onDeleteComplete,
  singleMode = false,
  productId,
  productIsArchived = false,
}: ProductActionsProps) {
  const t = useTranslations('Products');

  // Determine which product IDs to use
  const productIds =
    singleMode && productId ? [productId] : (selectedProductIds ?? []);

  // Use productIsArchived for single mode, fallback to isArchived for multiple mode
  const archivedState = singleMode ? productIsArchived : isArchived;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>

        {singleMode ? (
          // Single mode: Show archive/restore based on product state
          <DropdownMenuItem asChild className="p-0">
            <div>
              <ArchivedProduct
                productsIds={productIds}
                isArchived={archivedState}
                onSoftDeleteComplete={onDeleteComplete}
                singleMode={singleMode}
              />
            </div>
          </DropdownMenuItem>
        ) : (
          // Multiple mode: Show both archive and restore options
          <>
            <DropdownMenuItem asChild className="p-0">
              <div>
                <ArchivedProduct
                  productsIds={productIds}
                  isArchived={archivedState}
                  onSoftDeleteComplete={onDeleteComplete}
                  singleMode={singleMode}
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <div>
                <RestoreProduct
                  productsIds={productIds}
                  isArchived={archivedState}
                  onRestoreComplete={onDeleteComplete}
                />
              </div>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0">
          <div>
            <DeleteProduct
              productIds={productIds}
              onDeleteComplete={onDeleteComplete}
              singleMode={singleMode}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
