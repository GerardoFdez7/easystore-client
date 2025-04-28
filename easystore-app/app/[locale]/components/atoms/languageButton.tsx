'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Inicializar en inglés por defecto

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    const newPath = `/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-gray-900"
      >
        {selectedLanguage === 'en'
          ? 'Languages'
          : selectedLanguage === 'es'
            ? 'Idiomas'
            : 'Langues'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('en')}
            >
              English
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('es')}
            >
              Spanish
            </li>
            <li
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('fr')}
            >
              French
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
