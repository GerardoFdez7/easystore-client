// WelcomeCategory.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import WelcomeCategory from '@atoms/categories/WelcomeCategory';
import { NextIntlClientProvider } from 'next-intl';

const messagesMap = {
  en: { Category: { welcomeCategory: 'Categories' } },
  es: { Category: { welcomeCategory: 'Categorías' } },
  fr: { Category: { welcomeCategory: 'Catégories' } },
  it: { Category: { welcomeCategory: 'Categorie' } },
  pt: { Category: { welcomeCategory: 'Categorias' } },
};

type Locale = keyof typeof messagesMap;

const meta: Meta<typeof WelcomeCategory> = {
  title: 'Atoms/Category/WelcomeCategory',
  component: WelcomeCategory,
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
          <div style={{ padding: 16 }}>
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
  args: { locale: 'en' },
};
export default meta;

type Story = StoryObj<typeof WelcomeCategory>;
export const Default: Story = {};
