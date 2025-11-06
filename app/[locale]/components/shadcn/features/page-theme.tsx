'use client';

import React, { createContext, useContext, useState } from 'react';

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
  const [isDarkModeEnabled] = useState(true);

  return (
    <PageThemeContext.Provider value={{ isDarkModeEnabled }}>
      {children}
    </PageThemeContext.Provider>
  );
}
