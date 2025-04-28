'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { LanguageButton } from '@components/atoms/LanguageButton';
import LinkLog from './LinkLogIn';
import LinkPricing from './LinkPricing';

export default function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8">
          <Image
            src="/images/menu.png"
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
