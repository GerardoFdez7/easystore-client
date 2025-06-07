import { useTranslations } from 'next-intl';
import { Button } from '@atoms/shared/ButtonCn';
import Link from 'next/link';

export default function ButtonPrimary() {
  const t = useTranslations('Landing');

  return (
    <Link href="/register">
      <Button className="bg-primary : flex h-[70px] items-center justify-center rounded-full text-2xl font-extrabold text-white max-[580px]:h-[12vw] max-[580px]:w-[35vw] max-[580px]:min-w-[33vw] max-[580px]:text-[4vw]">
        {t('buttonStartFree')}
      </Button>
    </Link>
  );
}
