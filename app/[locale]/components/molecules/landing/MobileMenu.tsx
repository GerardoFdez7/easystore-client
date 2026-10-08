'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import LinkLog from '@atoms/landing/LinkLogIn';
import LinkPricing from '@atoms/landing/LinkPricing';
import OwnerMenu from '@molecules/dashboard/OwnerMenu';
import { useAuth } from '@contexts/AuthContext';
import { Button } from '@shadcn/ui/button';
import { Separator } from '@shadcn/ui/separator';
import { cn } from 'utils';
import { MenuIcon, type MenuIconHandle } from '@shadcn/ui/lucide-animated/menu';

export default function MobileMenu() {
  const { isAuthenticated } = useAuth();
  const t = useTranslations('Shared');
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const iconRef = useRef<MenuIconHandle>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreFocusRef = useRef(false);

  useEffect(() => {
    if (open) iconRef.current?.startAnimation();
    else iconRef.current?.stopAnimation();
  }, [open]);

  useLayoutEffect(() => {
    if (!open && shouldRestoreFocusRef.current) {
      toggleRef.current?.focus();
      shouldRestoreFocusRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        shouldRestoreFocusRef.current = true;
        setOpen(false);
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div>
      <Button
        ref={toggleRef}
        className="cursor-pointer lg:hidden"
        variant="ghost"
        type="button"
        size="icon"
        aria-label={open ? t('closeNavigationMenu') : t('openNavigationMenu')}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon ref={iconRef} size={28} aria-hidden="true" />
      </Button>

      {/* Backdrop: starts below the header so the header stays visible */}
      <div
        className={cn(
          'fixed inset-x-0 top-20 bottom-0 -z-10 bg-black/40 transition-opacity duration-300 sm:top-25',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        role="presentation"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel: drops down from the header */}
      <div
        id={panelId}
        role="navigation"
        aria-label={t('navigationMenu')}
        inert={!open}
        className={cn(
          'bg-background fixed inset-x-0 top-20 -z-10 border-b shadow-lg transition-all duration-300 ease-in-out sm:top-25',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <div className="flex flex-col px-6 pt-2 pb-5 sm:px-10">
          {isAuthenticated && (
            <div className="flex justify-center pb-4">
              <OwnerMenu />
            </div>
          )}
          <div
            role="presentation"
            className="flex flex-col gap-1 [&_a]:w-full [&_a]:justify-start"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a')) close();
            }}
          >
            {!isAuthenticated && <LinkLog />}
            <LinkPricing />
          </div>
          {!isAuthenticated && (
            <>
              <Separator className="mt-3" />
              <div className="flex items-center justify-between pt-4">
                <ThemeToggle />
                <LanguageButton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
