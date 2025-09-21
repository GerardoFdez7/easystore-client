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
import useDeleteProduct from '@hooks/domains/products/useDeleteProduct';
import { useTranslations } from 'next-intl';

interface DeleteProductProps {
  productIds: string[];
  onDeleteComplete?: () => void;
  singleMode?: boolean;
}

export default function DeleteProduct({
  productIds,
  onDeleteComplete,
  singleMode = false,
}: DeleteProductProps) {
  const t = useTranslations('Products');

  // Use single or multiple hooks based on mode
  const { handleMultipleDelete, loading: multipleLoading } =
    useMultipleDeleteProducts(onDeleteComplete);

  const { handleDelete, loading: singleLoading } = useDeleteProduct();

  const loading = singleMode ? singleLoading : multipleLoading;

  const handleDeleteAction = () => {
    if (singleMode && productIds.length > 0) {
      void handleDelete(productIds[0]);
      onDeleteComplete?.();
    } else {
      void handleMultipleDelete(productIds);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-red-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-4 w-4 text-red-700" />
          <span className="text-red-700">
            {' '}
            {singleMode ? t('deleteProduct') : t('deleteProducts')}
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {singleMode ? t('deleteProduct') : t('deleteProducts')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {singleMode ? t('deleteDescriptionSingle') : t('deleteDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAction}
            className="bg-[#ed2727] text-white hover:bg-[#d12525]"
            disabled={loading}
          >
            {loading
              ? t('deleting')
              : `${t('delete')}${productIds.length > 1 ? ` (${productIds.length})` : ''}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
