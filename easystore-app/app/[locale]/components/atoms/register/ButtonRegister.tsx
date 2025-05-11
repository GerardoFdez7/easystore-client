import { useTranslations } from 'next-intl';
import { Button } from '@atoms/shared/ButtonCn';

export default function ButtonLogin() {
  const t = useTranslations('Register');

  return (
    <Button className="bg-primary text-text flex h-[50px] w-full items-center justify-center rounded-full font-bold text-white max-[580px]:h-[12vw] max-[580px]:w-[35vw] max-[580px]:min-w-[33vw] max-[580px]:text-[4vw]">
      {t('buttonRegister')}
    </Button>
  );
}
