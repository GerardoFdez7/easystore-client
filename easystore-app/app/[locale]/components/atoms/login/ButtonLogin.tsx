import { useTranslations } from 'next-intl';
import { Button } from '@atoms/shared/ButtonCn';

export default function ButtonLogin() {
  const t = useTranslations('Login');

  return (
    <Button className="bg-primary flex h-12 w-full items-center justify-center rounded-full text-base font-bold text-white sm:h-14 sm:text-lg md:h-16 md:text-xl">
      {t('buttonLogin')}
    </Button>
  );
}
