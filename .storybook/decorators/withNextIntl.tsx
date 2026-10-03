import { NextIntlClientProvider } from 'next-intl';
import type { Decorator } from '@storybook/nextjs-vite';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';
import ptMessages from '../../messages/pt.json';

// Create a messages object with all locales
const messages = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
};

type Locale = keyof typeof messages;

export const withNextIntl: Decorator = (Story, context) => {
  const locale =
    (context?.globals?.locale as Locale) ||
    (context?.parameters?.locale as Locale) ||
    'en';

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <Story />
    </NextIntlClientProvider>
  );
};
