import { LanguageButton } from '@atoms/shared/ButtonLanguage';

export default function Header() {
  return (
    <header className="mx-9 mt-4 sm:mx-16">
      <div className="flex justify-end">
        <LanguageButton />
      </div>
    </header>
  );
}
