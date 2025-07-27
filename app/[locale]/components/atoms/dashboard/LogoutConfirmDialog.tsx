'use client';

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
import { useTranslations } from 'next-intl';
import { useLogout } from '@hooks/authentication/useLogout';

interface LogoutConfirmDialogProps {
  children: React.ReactNode;
}

export default function LogoutConfirmDialog({
  children,
}: LogoutConfirmDialogProps) {
  const t = useTranslations('Dashboard');
  const { handleLogout, isLoading } = useLogout();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('logoutConfirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('logoutConfirmDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('logoutConfirmCancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => void handleLogout()}
            disabled={isLoading}
            variant="danger"
          >
            {t('logoutConfirmAction')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
