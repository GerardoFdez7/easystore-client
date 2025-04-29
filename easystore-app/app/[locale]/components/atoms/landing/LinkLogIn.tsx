import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LinkLog() {
  const t = useTranslations('Landing');
  return (
    <Link href="#" className="text-gray-700 hover:text-gray-900">
      {t('login')}
    </Link>
  );
}
