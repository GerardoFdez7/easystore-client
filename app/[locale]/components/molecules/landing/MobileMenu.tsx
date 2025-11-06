'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from '@shadcn/ui/drawer';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import LinkLog from '@atoms/landing/LinkLogIn';
import LinkPricing from '@atoms/landing/LinkPricing';
import OwnerMenu from '@molecules/dashboard/OwnerMenu';
import { Menu } from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import { Button } from '@shadcn/ui/button';

export default function MobileMenu() {
  const { isAuthenticated } = useAuth();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          className="flex cursor-pointer items-center lg:hidden"
          variant="ghost"
          type="button"
          size="icon"
          aria-label="Open navigation menu"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Menu size={32} />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="bg-background flex h-screen w-56 flex-col shadow-lg"
        aria-describedby="drawer-description"
      >
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div id="drawer-description" className="sr-only">
          This is the navigation menu. Use the links to navigate through the
          site.
        </div>
        <div className="bg-background flex flex-col items-center space-y-4 p-4">
          {isAuthenticated && <OwnerMenu />}
          <ThemeToggle />
          <LanguageButton />
          <LinkPricing />
          {!isAuthenticated && <LinkLog />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
