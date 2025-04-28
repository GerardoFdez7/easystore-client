import { LanguageButton } from '@components/atoms/languageButton';
import LinkLog from '@components/atoms/LinkLogIn';
import LinkPricing from '@components/atoms/LinkPricing';

export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <LanguageButton />
      <LinkLog />
      <LinkPricing />
    </nav>
  );
}
