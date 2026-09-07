'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PageThemeProvider, usePageTheme } from './page-theme';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function CustomThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const { isDarkModeEnabled } = usePageTheme();
  const supportsSystemTheme = isDarkModeEnabled && enableSystem;
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (!isDarkModeEnabled) {
      return 'light';
    }

    if (theme === 'system' && supportsSystemTheme) {
      return systemTheme;
    }

    return theme === 'dark' ? 'dark' : 'light';
  }, [isDarkModeEnabled, supportsSystemTheme, systemTheme, theme]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);

    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
    ) {
      setTheme(storedTheme);
    }

    setHasLoadedTheme(true);

    if (!supportsSystemTheme) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      setSystemTheme(getSystemTheme());
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateSystemTheme);
    };
  }, [storageKey, supportsSystemTheme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [isMounted, resolvedTheme]);

  useEffect(() => {
    if (hasLoadedTheme) {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [hasLoadedTheme, storageKey, theme]);

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <PageThemeProvider>
      <CustomThemeProvider {...props}>{children}</CustomThemeProvider>
    </PageThemeProvider>
  );
}
