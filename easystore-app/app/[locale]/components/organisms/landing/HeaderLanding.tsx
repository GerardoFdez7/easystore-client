import Logo from '@atoms/landing/Logo';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';
import MobileMenu from '@molecules/landing/MobileMenu';
import NaviLinks from '@molecules/landing/NaviLinks';

export default function HeaderLanding() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 mt-0 flex h-20 items-center justify-between px-3 pt-4 pb-4 sm:h-25 sm:px-10">
      <Logo />
      <div className="flex items-center gap-2">
        <NaviLinks />
        <ButtonPrimary />
        <MobileMenu />
      </div>
    </header>
  );
}
