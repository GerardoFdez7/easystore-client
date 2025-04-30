'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import plantetIcon from '@assets/planet.png';

export const LanguageButton = () => {
  const t = useTranslations('Landing');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const lang = pathname?.substring(1, 3) || 'en';
    setSelectedLanguage(lang);
  }, [pathname]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <Image
          src={plantetIcon}
          alt="Cart Icon"
          width={20}
          height={20}
          className="mr-1 h-4 w-4"
        />
        {languageAbbreviations[selectedLanguage]}
      </button>

      {isOpen && (
        <div className="bg-background absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 shadow-lg">
          <ul>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('en')}
            >
              {t('English')}
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('es')}
            >
              {t('Spanish')}
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('fr')}
            >
              {t('French')}
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('it')}
            >
              {t('Italian')}
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('pt')}
            >
              {t('Portuguese')}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
