import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shadcn/ui/dropdown-menu';
import { Button } from '@shadcn/ui/button';
import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function MenuOwnerName() {
  const t = useTranslations('Dashboard');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground hover:text-title text-sm"
        >
          ON
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer text-lg">
          <User className="mr-2 h-4 w-4" />
          {t('profile')}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-lg">
          <LogOut className="mr-2 h-4 w-4" />
          {t('logOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
