import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LinkPricing() {
  const t = useTranslations('Landing');
  return (
    <Link href="#plans" className="text-title text-2xl font-medium">
      {t('pricing')}
    </Link>
  );
}
