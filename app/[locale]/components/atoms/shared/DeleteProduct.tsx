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
import { Trash2 } from 'lucide-react';
import useMultipleDeleteProducts from '@hooks/domains/products/useMultipleDeleteProducts';

interface DeleteProductProps {
  productIds: string[];
  onDeleteComplete?: () => void;
}

export default function DeleteProduct({
  productIds,
  onDeleteComplete,
}: DeleteProductProps) {
  const { handleMultipleDelete, isLoading } =
    useMultipleDeleteProducts(onDeleteComplete);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-red-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-4 w-4 text-red-700" />
          <span className="text-red-700">Delete Products</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete products?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The products will be permanently
            deleted from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => void handleMultipleDelete(productIds)}
            className="bg-[#ed2727] text-white hover:bg-[#d12525]"
            disabled={isLoading}
          >
            {isLoading
              ? 'Deleting...'
              : `Delete${productIds.length > 1 ? ` (${productIds.length})` : ''}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
