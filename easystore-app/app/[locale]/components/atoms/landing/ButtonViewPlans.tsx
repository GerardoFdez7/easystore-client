import { useTranslations } from 'next-intl';
import { Button } from '@atoms/shared/ButtonCn';

export default function ButtonViewPlans() {
  const t = useTranslations('Landing');

  return (
    <Button
      className="flex h-[70px] items-center justify-center rounded-full border-3 border-white bg-transparent text-2xl font-bold text-white max-[580px]:h-[12vw] max-[580px]:w-[35vw] max-[580px]:min-w-[33vw] max-[580px]:text-[4vw]"
      variant={'ghost'}
    >
      {t('buttonViewPlans')}
    </Button>
  );
}
