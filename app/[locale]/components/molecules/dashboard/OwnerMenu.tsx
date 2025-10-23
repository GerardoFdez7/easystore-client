'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@shadcn/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@shadcn/ui/avatar';
import { LogOut, User, LayoutDashboard } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@i18n/navigation';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import OwnerMenuItem from '@atoms/dashboard/OwnerMenuItem';
import { useAuth } from '@lib/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

export default function OwnerMenu() {
  const t = useTranslations('Dashboard');
  const tShared = useTranslations('Shared');
  const router = useRouter();
  const pathname = usePathname();
  const { tenantData } = useAuth();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const handleLogoutSelect = (event: Event) => {
    event.preventDefault();
  };

  // Generate initials from owner name
  const getInitials = (name: string | undefined) => {
    if (!name) return 'P';
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if user is on dashboard page
  const isOnDashboard = pathname === '/dashboard';
  // Check if user is on root page
  const isOnRoot = pathname === '/';

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Avatar
              className="h-11 w-11 cursor-pointer hover:opacity-80"
              aria-label={tShared('accountMenu')}
            >
              <AvatarFallback className="text-background bg-title text-xl font-bold">
                {getInitials(tenantData?.ownerName)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{tShared('accountMenu')}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-lg">
          {tShared('accountMenu')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isOnDashboard && isOnRoot && (
          <OwnerMenuItem
            icon={LayoutDashboard}
            label={t('dashboard')}
            onClick={handleDashboardClick}
          />
        )}
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
