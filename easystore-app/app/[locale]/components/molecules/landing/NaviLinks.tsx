import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import LinkLog from '@atoms/landing/LinkLogIn';
import LinkPricing from '@atoms/landing/LinkPricing';

export default function NaviLinks() {
  return (
    <nav className="hidden items-center gap-6 lg:flex">
      <LanguageButton />
      <LinkPricing />
      <LinkLog />
    </nav>
  );
}
