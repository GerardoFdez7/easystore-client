import Logo from '@atoms/landing/Logo';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

export default function HeaderTouch() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between px-3 pt-4 pb-4 sm:h-25 sm:px-10">
      <Logo />
      <div className="flex items-center gap-2">
        <LanguageButton />
      </div>
    </header>
  );
}
