import { NextIntlClientProvider } from 'next-intl';
import type { Decorator } from '@storybook/nextjs';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';
import frMessages from '../../messages/fr.json';
import itMessages from '../../messages/it.json';
import ptMessages from '../../messages/pt.json';

// Create a messages object with all locales
const messages = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
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
