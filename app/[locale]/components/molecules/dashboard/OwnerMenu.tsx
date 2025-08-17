'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@shadcn/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@shadcn/ui/avatar';
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
        <Avatar className="h-11 w-11 cursor-pointer hover:opacity-80">
          <AvatarFallback className="text-background bg-title text-xl font-bold">
            ON
          </AvatarFallback>
        </Avatar>
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
