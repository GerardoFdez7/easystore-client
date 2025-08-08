import type { Meta, StoryObj } from '@storybook/react';
import SearchCategory from '@atoms/category/SearchCategory';
import { NextIntlClientProvider } from 'next-intl';

const messagesMap = {
  en: { Category: { searchPlaceholder: 'Search categories...' } },
  es: { Category: { searchPlaceholder: 'Buscar categorías...' } },
  fr: { Category: { searchPlaceholder: 'Rechercher des catégories...' } },
  it: { Category: { searchPlaceholder: 'Cerca categorie...' } },
  pt: { Category: { searchPlaceholder: 'Buscar categorias...' } },
};

type Locale = keyof typeof messagesMap;

const meta: Meta<typeof SearchCategory> = {
  title: 'Atoms/Category/SearchCategory',
  component: SearchCategory,
  argTypes: {
    locale: {
      control: 'select',
      options: Object.keys(messagesMap),
      description: 'Idioma para la demo',
    },
  },
  decorators: [
    (Story, ctx) => {
      const locale =
        ((ctx.args as { locale?: Locale }).locale as Locale) ?? 'en';
      return (
        <NextIntlClientProvider locale={locale} messages={messagesMap[locale]}>
          <div style={{ padding: 16, background: '#f3f4f6', maxWidth: 720 }}>
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
  args: { locale: 'en' },
};
export default meta;

type Story = StoryObj<typeof SearchCategory>;
export const Default: Story = {};
