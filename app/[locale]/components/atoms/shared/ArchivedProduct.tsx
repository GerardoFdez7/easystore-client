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
import { Archive, RotateCcw } from 'lucide-react';
import {
  useRestoreProduct,
  useSoftDeleteProduct,
  useMultipleSoftDeleteProducts,
} from '@hooks/domains/products/index';
import { useTranslations } from 'next-intl';

interface ArchivedProductProps {
  productsIds: string[];
  isArchived?: boolean | boolean[];
  onSoftDeleteComplete?: () => void;
  singleMode?: boolean;
}
export default function ArchivedProduct({
  productsIds,
  isArchived = false,
  onSoftDeleteComplete,
  singleMode = false,
}: ArchivedProductProps) {
  // Use single or multiple hooks based on mode
  const { handleMultipleSoftDelete, loading: multipleLoading } =
    useMultipleSoftDeleteProducts({
      onSuccess: onSoftDeleteComplete,
    });

  const { handleSoftDelete, loading: singleLoading } = useSoftDeleteProduct();
  const { handleRestore, loading: restoreLoading } = useRestoreProduct();

  const t = useTranslations('Products');

  // Determine if product is archived in single mode
  const isProductArchived = singleMode
    ? Array.isArray(isArchived)
      ? isArchived[0]
      : isArchived
    : false;

  const loading = singleMode
    ? isProductArchived
      ? restoreLoading
      : singleLoading
    : multipleLoading;

  const handleArchive = () => {
    if (singleMode && productsIds.length > 0) {
      if (isProductArchived) {
        void handleRestore(productsIds[0]).then(() => {
          // Call the callback after successful restore to update parent component
          onSoftDeleteComplete?.();
        });
      } else {
        void handleSoftDelete(productsIds[0]).then(() => {
          // Call the callback after successful archive to update parent component
          onSoftDeleteComplete?.();
        });
      }
    } else {
      void handleMultipleSoftDelete(productsIds, isArchived);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {singleMode && isProductArchived ? (
            <>
              <RotateCcw className="text-title h-4 w-4" />
              <span>{t('restoreProduct')}</span>
            </>
          ) : (
            <>
              <Archive className="text-title h-4 w-4" />
              <span>
                {singleMode ? t('archiveProduct') : t('archiveProducts')}
              </span>
            </>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {singleMode && isProductArchived
              ? t('restoreProduct')
              : singleMode
                ? t('archiveProduct')
                : t('archiveProducts')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {singleMode && isProductArchived
              ? t('restoreDescription')
              : singleMode
                ? t('archiveDescriptionSingle')
                : t('archiveDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleArchive}
            className="bg-title border border-black hover:bg-black/85 dark:hover:bg-gray-300"
            disabled={loading}
          >
            {loading
              ? singleMode && isProductArchived
                ? t('restoring')
                : t('archiving')
              : singleMode && isProductArchived
                ? t('restore')
                : `${t('archive')}${productsIds.length > 1 ? ` (${productsIds.length})` : ''}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
