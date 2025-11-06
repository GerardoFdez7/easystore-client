'use client';

import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import LinkLog from '@atoms/landing/LinkLogIn';
import LinkPricing from '@atoms/landing/LinkPricing';
import { useAuth } from '@contexts/AuthContext';

export default function NaviLinks() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="hidden items-center gap-6 lg:flex">
      <ThemeToggle />
      <LanguageButton />
      <LinkPricing />
      {!isAuthenticated && <LinkLog />}
    </nav>
  );
}
