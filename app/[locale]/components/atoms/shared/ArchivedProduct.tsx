import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@shadcn/ui/alert-dialog';
import { Archive } from 'lucide-react';
import useMultipleSoftDeleteProducts from '@hooks/domains/products/useMultipleSoftDeleteProducts';

interface ArchivedProductProps {
  productsIds: string[];
  isArchived?: boolean | boolean[];
  onSoftDeleteComplete?: () => void;
}
export default function ArchivedProduct({
  productsIds,
  isArchived = false,
  onSoftDeleteComplete,
}: ArchivedProductProps) {
  const { handleMultipleSoftDelete, isLoading } = useMultipleSoftDeleteProducts(
    {
      onSuccess: onSoftDeleteComplete,
    },
  );
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Archive className="text-title h-4 w-4" />
          <span>Archive Products</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Products</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive these products?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              void handleMultipleSoftDelete(productsIds, isArchived)
            }
            className="bg-title border border-black hover:bg-black/85 dark:hover:bg-gray-300"
            disabled={isLoading}
          >
            {isLoading
              ? 'Archiving'
              : `Archive${productsIds.length > 1 ? ` (${productsIds.length})` : ''}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
