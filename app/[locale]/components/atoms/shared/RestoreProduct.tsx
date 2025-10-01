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
import { RotateCcw } from 'lucide-react';
import { useMultipleRestoreProducts } from '@hooks/domains/products';
import { useTranslations } from 'next-intl';

interface RestoreProductProps {
  productsIds: string[];
  isArchived?: boolean | boolean[];
  onRestoreComplete?: () => void;
}

export default function RestoreProduct({
  productsIds,
  isArchived = false,
  onRestoreComplete,
}: RestoreProductProps) {
  const { handleMultipleRestore, loading } = useMultipleRestoreProducts({
    onSuccess: onRestoreComplete,
  });

  const t = useTranslations('Products');

  const handleRestore = () => {
    void handleMultipleRestore(productsIds, isArchived);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <RotateCcw className="text-title h-4 w-4" />
          <span>{t('restoreProducts')}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('restoreProducts')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('multipleRestoreDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRestore}
            className="bg-title border border-black hover:bg-black/85 dark:hover:bg-gray-300"
            disabled={loading}
          >
            {loading
              ? t('restoring')
              : `${t('restore')}${productsIds.length > 1 ? ` (${productsIds.length})` : ''}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
