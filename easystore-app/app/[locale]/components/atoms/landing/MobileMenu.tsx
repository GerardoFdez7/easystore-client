'use client';

import * as React from 'react';
import Image from 'next/image';
import menuIcon from '@assets/menu.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/molecules/landing/DropdownMenuCn';
import { LanguageButton } from '@components/atoms/landing/ButtonLanguage';
import LinkLog from './LinkLogIn';
import LinkPricing from './LinkPricing';

export default function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8">
          <Image
            src={menuIcon}
            alt="Menu Icon"
            fill
            className="object-contain"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex h-screen w-56 flex-col bg-white shadow-lg">
        <div className="flex flex-col space-y-3 p-4">
          <LinkLog />
          <LinkPricing />
          <LanguageButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
