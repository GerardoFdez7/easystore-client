import { LanguageButton } from '@components/atoms/shared/ButtonLanguage';

export default function HeaderRegister() {
  return (
    <header className="bg-background sticky top-0 right-0 left-0 z-50 mt-0 flex h-12 items-center justify-end px-3 pt-2 pb-2 sm:h-16 sm:px-10">
      <div className="flex items-center gap-2">
        <LanguageButton />
      </div>
    </header>
  );
}
