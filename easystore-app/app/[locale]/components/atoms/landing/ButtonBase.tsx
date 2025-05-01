import { useTranslations } from 'next-intl';
import { Button } from '@components/atoms/shared/ButtonCn';

export default function ButtonBase() {
  const t = useTranslations('Landing');

  return (
    <Button className="bg-primary : flex h-[70px] items-center justify-center rounded-full text-2xl font-extrabold text-white max-[580px]:h-[12vw] max-[580px]:w-[35vw] max-[580px]:min-w-[33vw] max-[580px]:text-[4vw]">
      {t('buttonStartFree')}
    </Button>
  );
}
