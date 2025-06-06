'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { PageThemeProvider, usePageTheme } from './PageThemeProvider';

function CustomThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { isDarkModeEnabled } = usePageTheme();

  return (
    <NextThemesProvider
      {...props}
      enableSystem={isDarkModeEnabled}
      attribute="class"
      defaultTheme={isDarkModeEnabled ? 'system' : 'light'}
      forcedTheme={!isDarkModeEnabled ? 'light' : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <PageThemeProvider>
      <CustomThemeProvider {...props}>{children}</CustomThemeProvider>
    </PageThemeProvider>
  );
}
