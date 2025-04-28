import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import MenuIcon from '../atoms/menuIcon';
import NavLinks from '../molecules/navLinks';

import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Landing');
  return (
    <header className="flex items-center justify-between bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-xl font-bold text-gray-900">EasyStore</span>
      </div>
      <div className="mr-4 flex items-center gap-4">
        <NavLinks />
      </div>
      <div className="block flex items-center gap-5 md:hidden">
        <Button label={t('buttonStartFree')} />
        <MenuIcon />
      </div>
    </header>
  );
}
