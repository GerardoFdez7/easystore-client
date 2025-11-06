'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import { usePageTheme } from '@shadcn/features/page-theme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { isDarkModeEnabled } = usePageTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Shared');

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Hide the toggle only on pages that explicitly don't support dark mode
  if (!isDarkModeEnabled) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={toggleTheme}
          className="hover:bg-hover h-10 w-10 cursor-pointer rounded-md"
          aria-label={t('themeToggle')}
        >
          <Sun className="text-title size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{t('themeToggle')}</TooltipContent>
    </Tooltip>
  );
}
