import { useTranslations } from 'next-intl';
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
import { Button } from '@shadcn/ui/button';
import { Archive } from 'lucide-react';
import { useState } from 'react';

export default function ArchivedProduct() {
  const [isArchived, setIsArchived] = useState(false);
  const t = useTranslations('Products');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-title bg-card hover:bg-title hover:text-card border"
        >
          <Archive className="mr-2 h-4 w-4" />
          {isArchived ? t('unarchiveProduct') : t('archiveProduct')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArchived ? t('unarchiveProductTitle') : t('archiveProductTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isArchived
              ? t('unarchiveProductDescription')
              : t('archiveProductDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setIsArchived(!isArchived)}
            className="bg-title hover:bg-title/80 text-white dark:text-black"
          >
            {isArchived ? t('unarchive') : t('archive')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
