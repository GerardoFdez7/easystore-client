import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';

export default function ButtonViewPlans() {
  const t = useTranslations('Landing');

  return (
    <Button
      className="max-[580px]:h-cta-sm max-[580px]:w-cta-sm max-[580px]:text-cta-sm flex h-17.5 cursor-pointer items-center justify-center rounded-full border-3 border-white bg-transparent text-2xl font-bold text-white hover:cursor-pointer max-[580px]:min-w-0 max-[580px]:px-2"
      variant={'ghost'}
    >
      {t('buttonViewPlans')}
    </Button>
  );
}
