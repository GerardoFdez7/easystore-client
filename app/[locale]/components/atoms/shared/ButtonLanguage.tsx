'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@shadcn/ui/dropdown-menu';

export const LanguageButton = () => {
  const t = useTranslations('Languages');
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const lang = pathname?.substring(1, 3) || 'en';
    setSelectedLanguage(lang);
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
      <DropdownMenuTrigger asChild>
        <button className="text-title hover:text-gray-90 flex cursor-pointer items-center gap-1 text-2xl font-medium">
          <Globe size={24} className="h-6 w-6 md:h-7 md:w-7" />
          {languageAbbreviations[selectedLanguage]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 font-medium">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          {t('English')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
          {t('Spanish')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
          {t('French')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('it')}>
          {t('Italian')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('pt')}>
          {t('Portuguese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
