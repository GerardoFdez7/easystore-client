import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ImageTopProducts() {
  const t = useTranslations('Dashboard');
  return (
    <div className="rounded-lg">
      <Image
        src="/laptop.webp"
        alt={t('topProductImageAlt')}
        width={166}
        height={66}
        className="rounded-lg"
        priority
      />
    </div>
  );
}
