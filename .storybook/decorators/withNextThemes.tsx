'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, useContext, useState, ReactNode } from 'react';

type PageThemeContextType = {
  isDarkModeEnabled: boolean;
};

const PageThemeContext = createContext<PageThemeContextType>({
  isDarkModeEnabled: true,
});

function usePageTheme() {
  return useContext(PageThemeContext);
}

function PageThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkModeEnabled] = useState(true);

  return (
    <PageThemeContext.Provider value={{ isDarkModeEnabled }}>
      {children}
    </PageThemeContext.Provider>
  );
}

function CustomThemeProvider({ children, theme, ...props }) {
  const { isDarkModeEnabled } = usePageTheme();

  return (
    <NextThemesProvider
      {...props}
      enableSystem={isDarkModeEnabled}
      attribute="class"
      defaultTheme={theme}
      forcedTheme={theme === 'system' ? undefined : theme}
      key={theme} // Force re-render when theme changes
    >
      {children}
    </NextThemesProvider>
  );
}

export const withNextThemes = (Story, context) => {
  const theme = context?.globals?.theme || 'system';

  // Force re-render when theme changes by using key
  return (
    <PageThemeProvider>
      <CustomThemeProvider theme={theme} key={`theme-${theme}`}>
        <Story />
      </CustomThemeProvider>
    </PageThemeProvider>
  );
};
