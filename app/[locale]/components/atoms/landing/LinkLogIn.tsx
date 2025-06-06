import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LinkLog() {
  const t = useTranslations('Landing');
  return (
    <Link href="#" className="text-title text-2xl font-medium">
      {t('login')}
    </Link>
  );
}
