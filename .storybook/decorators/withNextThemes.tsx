'use client';

import { useEffect } from 'react';
import type { Decorator } from '@storybook/nextjs-vite';
import { ThemeProvider, useTheme } from '@shadcn/features/theme-provider';

type Theme = 'light' | 'dark' | 'system';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

/** Keeps Storybook's toolbar in sync with the application's theme context. */
function StorybookThemeBridge({ theme }: { theme: Theme }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);

  return null;
}

export const withNextThemes: Decorator = (Story, context) => {
  const toolbarTheme = context.globals.theme;
  const theme = isTheme(toolbarTheme) ? toolbarTheme : 'system';

  return (
    <ThemeProvider defaultTheme={theme} storageKey="easystore-storybook-theme">
      <StorybookThemeBridge theme={theme} />
      <Story />
    </ThemeProvider>
  );
};
