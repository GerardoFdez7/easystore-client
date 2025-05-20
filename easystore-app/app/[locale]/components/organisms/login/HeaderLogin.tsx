import { LanguageButton } from '@components/atoms/shared/ButtonLanguage';

export default function HeaderLogin() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-12 items-center justify-end px-3 sm:h-14 sm:px-6 md:h-16 md:px-10 lg:h-20 lg:px-16">
      <LanguageButton />
    </header>
  );
}
