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

    // Check if current path is in the list of pages without dark mode
    // Use exact match or ensure we're not matching partial paths incorrectly
    const shouldDisableDarkMode = noDarkModePages.some((path) => {
      // For root locale paths like '/en', '/es', etc., use exact match
      if (path.split('/').length === 2) {
        return pathname === path;
      }
      // For other paths, use startsWith but ensure it's a complete path segment
      return (
        pathname.startsWith(path) &&
        (pathname === path || pathname.startsWith(path + '/'))
      );
    });

    // Enable dark mode for all pages except those in noDarkModePages
    setIsDarkModeEnabled(!shouldDisableDarkMode);
  }, [pathname]);

  return (
    <PageThemeContext.Provider value={{ isDarkModeEnabled }}>
      {children}
    </PageThemeContext.Provider>
  );
}
