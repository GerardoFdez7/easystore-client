'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from '@molecules/shared/Drawer';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import LinkLog from '@atoms/landing/LinkLogIn';
import LinkPricing from '@atoms/landing/LinkPricing';
import { Menu } from 'lucide-react';

export default function MobileMenu() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className="flex items-center lg:hidden"
          aria-label="Open navigation menu"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Menu size={32} />
        </button>
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
          <LanguageButton />
          <LinkPricing />
          <LinkLog />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
