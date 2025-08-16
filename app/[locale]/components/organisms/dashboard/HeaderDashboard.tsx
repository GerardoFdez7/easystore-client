import Logo from '@atoms/shared/Logo';
import OwnerMenu from '@molecules/dashboard/OwnerMenu';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import NotificationButton from '@atoms/shared/NotificationButton';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
// import { ShieldQuestionIcon } from 'lucide-react';

export default function HeaderDashboard() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 h-20 px-3 py-4 sm:h-25 sm:px-10">
      <div className="flex items-center justify-between">
        <Logo redirectTo="/dashboard" />
        <div className="flex items-center gap-4">
          {/* <ShieldQuestionIcon className="text-title hover:bg-hover h-5 w-5" /> */}
          <NotificationButton />
          <ThemeToggle />
          <LanguageButton />
          <OwnerMenu />
        </div>
      </div>
    </header>
  );
}
