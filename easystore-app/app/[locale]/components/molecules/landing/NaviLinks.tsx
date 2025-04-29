import { LanguageButton } from '@components/atoms/landing/ButtonLanguage';
import LinkLog from '@components/atoms/landing/LinkLogIn';
import LinkPricing from '@components/atoms/landing/LinkPricing';

export default function NaviLinks() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <LanguageButton />
      <LinkLog />
      <LinkPricing />
    </nav>
  );
}
