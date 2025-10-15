'use client';

import Logo from '@atoms/shared/Logo';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';
import MobileMenu from '@molecules/landing/MobileMenu';
import NaviLinks from '@molecules/landing/NaviLinks';
import OwnerMenu from '@molecules/dashboard/OwnerMenu';
import { useAuth } from '@contexts/AuthContext';

export default function HeaderLanding() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between px-3 pt-4 pb-4 sm:h-25 sm:px-10">
      <Logo redirectTo={'/'} />
      <div className="flex items-center gap-2">
        <NaviLinks />
        {isAuthenticated ? (
          <div className="hidden lg:block">
            <OwnerMenu />
          </div>
        ) : (
          <ButtonPrimary />
        )}
        <MobileMenu />
      </div>
    </header>
  );
}
