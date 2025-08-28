import type { Meta, StoryObj } from '@storybook/react';
import Search from '@atoms/shared/Search';
import * as React from 'react';
import { NextIntlClientProvider, useTranslations } from 'next-intl';

const messagesMap = {
  en: { Category: { searchPlaceholder: 'Search…' } },
  es: { Category: { searchPlaceholder: 'Buscar…' } },
  fr: { Category: { searchPlaceholder: 'Rechercher…' } },
  it: { Category: { searchPlaceholder: 'Cercare…' } },
  pt: { Category: { searchPlaceholder: 'Pesquisar…' } },
};
type Locale = keyof typeof messagesMap;

function useStorySearch(delay = 500) {
  const [query, setQuery] = React.useState('');
  const [isDebouncing, setIsDebouncing] = React.useState(false);

  React.useEffect(() => {
    setIsDebouncing(true);
    const id = window.setTimeout(() => {
      setIsDebouncing(false);
    }, delay);
    return () => window.clearTimeout(id);
  }, [query, delay]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [],
  );

  return { query, onChange, isDebouncing, reset: () => setQuery('') };
}

function SearchHarness({
  locale,
  disabled,
  className,
  inputClassName,
}: {
  locale: Locale;
  delay: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}) {
  const t = useTranslations('Category');
  return (
    <NextIntlClientProvider locale={locale} messages={messagesMap[locale]}>
      <Search
        placeholder={t('searchPlaceholder')}
        useSearch={useStorySearch}
        disabled={disabled}
        className={className}
        inputClassName={inputClassName}
      />
    </NextIntlClientProvider>
  );
}

const meta: Meta<typeof SearchHarness> = {
  title: 'Atoms/Shared/Search',
  component: SearchHarness,
  argTypes: {
    locale: {
      control: 'select',
      options: Object.keys(messagesMap),
      description: 'Idioma para la demo',
    },
    disabled: { control: 'boolean' },
    delay: { control: 'number', description: 'Debounce en ms' },
    className: { control: 'text' },
    inputClassName: { control: 'text' },
  },
  args: {
    locale: 'en',
    delay: 500,
    disabled: false,
  },
  decorators: [
    (Story, ctx) => {
      const locale =
        ((ctx.args as { locale?: Locale }).locale as Locale) ?? 'en';
      return (
        <NextIntlClientProvider locale={locale} messages={messagesMap[locale]}>
          <div style={{ padding: 16 }}>
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof SearchHarness>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomClasses: Story = {
  args: {
    className: 'max-w-md',
    inputClassName:
      'selection:bg-emerald-200 selection:text-emerald-950 placeholder:text-slate-400',
  },
};
