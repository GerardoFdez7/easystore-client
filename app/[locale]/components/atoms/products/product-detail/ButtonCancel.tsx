import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
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
import { useRouter } from 'next/navigation';

export default function ButtonCancel() {
  const router = useRouter();
  const t = useTranslations('Products');
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{t('cancel')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('discardChanges')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('discardChangesDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.back()}
            className="bg-title hover:bg-title/80 text-white dark:text-black"
          >
            {t('discardChanges')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
