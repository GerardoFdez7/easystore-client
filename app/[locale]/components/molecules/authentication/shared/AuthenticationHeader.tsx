'use client';

import React from 'react';
import BackButton from '@atoms/shared/BackButton';
import LogoImage from '@atoms/shared/LogoImage';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import { cn } from '@lib/utils/cn';

export interface AuthenticationHeaderProps {
  title: string;
  description: string;
  descriptionClassName?: string;
}

export default function AuthenticationHeader({
  title,
  description,
  descriptionClassName,
}: AuthenticationHeaderProps) {
  return (
    <header className="px-4 py-6 sm:px-8 md:px-16 lg:px-32">
      <BackButton />
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-6 md:right-16">
        <LanguageButton />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center text-center sm:mt-22 sm:flex-row sm:space-x-4 sm:text-left">
        <LogoImage
          width={140}
          height={140}
          className="h-20 w-20 sm:h-20 sm:w-20 md:h-28 md:w-28"
        />
        <div>
          <h1 className="text-title text-4xl font-bold sm:mt-4">{title}</h1>
          <p
            className={cn(
              'text-text text-lg font-medium',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
