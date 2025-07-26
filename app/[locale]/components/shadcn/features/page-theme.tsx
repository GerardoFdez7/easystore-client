'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type PageThemeContextType = {
  isDarkModeEnabled: boolean;
};

const PageThemeContext = createContext<PageThemeContextType>({
  isDarkModeEnabled: true,
});

export function usePageTheme() {
  return useContext(PageThemeContext);
}

export function PageThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  useEffect(() => {
    // Define the views that should not have dark mode
    const noDarkModePages = [
      '/en',
      '/en/login',
      '/en/register',
      '/en/register/confirm',
      '/en/contact',
      '/en/terms',
      '/en/privacy',
      '/es',
      '/es/login',
      '/es/register',
      '/es/register/confirm',
      '/es/contact',
      '/es/terms',
      '/es/privacy',
      '/fr',
      '/fr/login',
      '/fr/register',
      '/fr/register/confirm',
      '/fr/contact',
      '/fr/terms',
      '/fr/privacy',
      '/pt',
      '/pt/login',
      '/pt/register',
      '/pt/register/confirm',
      '/pt/contact',
      '/pt/terms',
      '/pt/privacy',
      '/it',
      '/it/login',
      '/it/register',
      '/it/register/confirm',
      '/it/contact',
      '/it/terms',
      '/it/privacy',
    ];

    // Define the views that should have dark mode enabled
    const darkModePages = [
      '/en/dashboard',
      '/es/dashboard',
      '/fr/dashboard',
      '/pt/dashboard',
      '/it/dashboard',
    ];

    // Check if current path is in the list of pages without dark mode
    const shouldDisableDarkMode = noDarkModePages.some((path) =>
      pathname.startsWith(path),
    );

    // Check if current path is in the list of pages with dark mode
    const shouldEnableDarkMode = darkModePages.some((path) =>
      pathname.startsWith(path),
    );

    // Enable dark mode if it's explicitly allowed, disable if it's explicitly forbidden
    setIsDarkModeEnabled(shouldEnableDarkMode || !shouldDisableDarkMode);
  }, [pathname]);

  return (
    <PageThemeContext.Provider value={{ isDarkModeEnabled }}>
      {children}
    </PageThemeContext.Provider>
  );
}
