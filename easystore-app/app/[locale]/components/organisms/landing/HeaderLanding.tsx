import Logo from '@components/atoms/landing/Logo';
import ButtonBase from '@components/atoms/landing/ButtonBase';
import MobileMenu from '@components/molecules/landing/MobileMenu';
import NaviLinks from '@components/molecules/landing/NaviLinks';

export default function HeaderLanding() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 mt-0 flex h-20 items-center justify-between px-3 pt-4 pb-4 sm:h-25 sm:px-10">
      <Logo />
      <div className="flex items-center gap-2">
        <NaviLinks />
        <ButtonBase />
        <MobileMenu />
      </div>
    </header>
  );
}
