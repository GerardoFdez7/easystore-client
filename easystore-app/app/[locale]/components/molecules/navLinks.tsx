import { LanguageButton } from '@components/atoms/LanguageButton';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
  const t = useTranslations('Landing');
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <LanguageButton />
      <Link href="#" className="text-gray-700 hover:text-gray-900">
        {t('pricing')}
      </Link>
      <Link href="#" className="text-gray-700 hover:text-gray-900">
        {t('login')}
      </Link>
    </nav>
  );
}
