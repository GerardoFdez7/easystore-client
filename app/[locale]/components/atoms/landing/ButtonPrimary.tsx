import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import Link from 'next/link';

export default function ButtonPrimary() {
  const t = useTranslations('Landing');

  return (
    <Link href="/register">
      <Button className="bg-primary max-[580px]:h-cta-sm max-[580px]:w-cta-sm max-[580px]:text-cta-sm flex h-17.5 cursor-pointer items-center justify-center rounded-full text-2xl font-bold text-white hover:cursor-pointer max-[580px]:min-w-0 max-[580px]:px-2">
        {t('buttonStartFree')}
      </Button>
    </Link>
  );
}
