import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';

export default function ButtonViewPlans() {
  const t = useTranslations('Landing');

  return (
    <Button
      className="flex h-17.5 cursor-pointer items-center justify-center rounded-full border-3 border-white bg-transparent text-2xl font-bold text-white hover:cursor-pointer max-sm:h-12 max-sm:w-52 max-sm:min-w-48 max-sm:text-base"
      variant={'ghost'}
    >
      {t('buttonViewPlans')}
    </Button>
  );
}
