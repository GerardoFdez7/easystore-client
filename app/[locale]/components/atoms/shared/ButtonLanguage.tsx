'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@shadcn/ui/dropdown-menu';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../../shadcn/ui/tooltip';
import { Button } from '@shadcn/ui/button';

export const LanguageButton = () => {
  const t = useTranslations('Languages');
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const lang = pathname?.substring(1, 3) || 'en';
    setSelectedLanguage(lang);

    // Set NEXT_LOCALE cookie automatically when component mounts or locale changes
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }, [pathname]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const newPath = `/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`;
    router.push(newPath);
  };

  const languageAbbreviations: Record<string, string> = {
    en: 'En',
    es: 'Es',
    fr: 'Fr',
    it: 'It',
    pt: 'Pt',
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="text-title h-9 w-9 p-0 font-medium sm:h-10 sm:w-16 sm:gap-1 sm:text-2xl"
              variant="ghost"
              aria-label={t('Languages')}
            >
              <Globe className="size-6" />
              <span className="hidden sm:inline">
                {languageAbbreviations[selectedLanguage]}
              </span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('Languages')}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-48 font-medium">
        <DropdownMenuLabel className="text-lg">
          {t('Languages')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem
            value="en"
            className="cursor-pointer text-base"
          >
            {t('English')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="es"
            className="cursor-pointer text-base"
          >
            {t('Spanish')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="fr"
            className="cursor-pointer text-base"
          >
            {t('French')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="it"
            className="cursor-pointer text-base"
          >
            {t('Italian')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="pt"
            className="cursor-pointer text-base"
          >
            {t('Portuguese')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
