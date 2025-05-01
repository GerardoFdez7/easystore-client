import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LinkPricing() {
  const t = useTranslations('Landing');
  return (
    <Link
      href="#"
      className="text-text text-2xl font-medium hover:text-gray-900"
    >
      {t('pricing')}
    </Link>
  );
}
