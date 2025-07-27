'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@shadcn/ui/dropdown-menu';
import { Button } from '@shadcn/ui/button';
import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import LogoutConfirmDialog from '@atoms/dashboard/LogoutConfirmDialog';
import OwnerMenuItem from '@atoms/dashboard/OwnerMenuItem';

export default function OwnerMenu() {
  const t = useTranslations('Dashboard');
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleLogoutSelect = (event: Event) => {
    event.preventDefault();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="text-title hover:bg-hover h-10 w-10 text-lg"
        >
          ON
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <OwnerMenuItem
          icon={User}
          label={t('profile')}
          onClick={handleProfileClick}
        />
        <LogoutConfirmDialog>
          <OwnerMenuItem
            icon={LogOut}
            label={t('logOut')}
            onSelect={handleLogoutSelect}
          />
        </LogoutConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
