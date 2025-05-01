'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from '@components/molecules/shared/Drawer';
import { LanguageButton } from '@components/atoms/shared/ButtonLanguage';
import LinkLog from '@components/atoms/landing/LinkLogIn';
import LinkPricing from '@components/atoms/landing/LinkPricing';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  className?: string;
  // Add any additional props you need here
}

export default function MobileMenu({ className = '' }: MobileMenuProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className={`relative h-8 w-8 ${className}`}
          aria-label="Open navigation menu"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Menu size={32} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-background flex h-screen w-56 flex-col shadow-lg">
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="bg-background flex flex-col items-center space-y-4 p-4">
          <LanguageButton />
          <LinkPricing />
          <LinkLog />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
