import { Logo } from '@components/atoms/landing/Logo';
import { ButtonBase } from '@components/atoms/landing/ButtonBase';
import MobileMenu from '@components/molecules/landing/MobileMenu';
import NaviLinks from '@components/molecules/landing/NaviLinks';

import { useTranslations } from 'next-intl';

export default function HeaderLanding() {
  const t = useTranslations('Landing');
  return (
    <header className="mx-3 mt-4 flex items-center justify-between sm:mx-10">
      <Logo />
      <div className="flex items-center gap-2">
        <NaviLinks />
        <ButtonBase label={t('buttonStartFree')} />
        <MobileMenu className="flex items-center lg:hidden" />
      </div>
    </header>
  );
}
