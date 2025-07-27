'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PublicRoutes } from '@lib/consts/routes';

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
    // Helper function to check if current path should disable dark mode
    const shouldDisableDarkMode = (): boolean => {
      // Remove locale prefix if present (e.g., /en/login -> /login)
      const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

      return PublicRoutes.some((route) => {
        if (route === '/') {
          return cleanPath === '/';
        }
        return cleanPath.startsWith(route);
      });
    };

    // Enable dark mode for all pages except public routes
    setIsDarkModeEnabled(!shouldDisableDarkMode());
  }, [pathname]);

  return (
    <PageThemeContext.Provider value={{ isDarkModeEnabled }}>
      {children}
    </PageThemeContext.Provider>
  );
}
