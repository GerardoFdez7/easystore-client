import Logo from '@atoms/shared/Logo';
import HelpButton from '@molecules/dashboard/HelpButton';
import ThemeToggle from '@atoms/shared/ThemeToggle';
// import NotificationButton from '@atoms/shared/NotificationButton';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

export default function HeaderDashboard() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 h-20 px-3 py-4 sm:h-20 sm:px-6">
      <div className="flex items-center justify-between">
        <Logo redirectTo="/dashboard" />
        <div className="flex items-center gap-3">
          <HelpButton />
          {/* <NotificationButton /> */}
          <ThemeToggle />
          <LanguageButton />
        </div>
      </div>
    </header>
  );
}
