import { LogoCart } from '@components/atoms/landing/LogoCart';
import { ButtonBase } from '@components/atoms/landing/ButtonBase';
import MobileMenu from '@components/atoms/landing/MobileMenu';
import NaviLinks from '@components/molecules/landing/NaviLinks';

import { useTranslations } from 'next-intl';

export default function HeaderLanding() {
  const t = useTranslations('Landing');
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <LogoCart />
        <span className="text-title text-2xl font-extrabold">EasyStore</span>
      </div>
      <div className="mr-4 flex items-center gap-4">
        <NaviLinks />
      </div>
      <div className="block flex items-center gap-5 md:hidden">
        <ButtonBase label={t('buttonStartFree')} />
        <MobileMenu />
      </div>
    </header>
  );
}
