import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import Link from 'next/link';

export default function ButtonPrimary() {
  const t = useTranslations('Landing');

  return (
    <Link href="/register">
      <Button className="bg-primary flex h-17.5 cursor-pointer items-center justify-center rounded-full text-2xl font-extrabold text-white hover:cursor-pointer max-sm:h-12 max-sm:w-52 max-sm:min-w-48 max-sm:text-base">
        {t('buttonStartFree')}
      </Button>
    </Link>
  );
}
