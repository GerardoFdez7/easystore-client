import type { Meta, StoryObj } from '@storybook/react';
import WelcomeDetailCategory from '@atoms/detail-category/WelcomeDetailCategory';
import { NextIntlClientProvider } from 'next-intl';

const messagesMap = {
  en: { CategoryDetail: { welcomeDetailCategory: 'Category detail' } },
  es: { CategoryDetail: { welcomeDetailCategory: 'Detalle de categoría' } },
  fr: { CategoryDetail: { welcomeDetailCategory: 'Détail de la catégorie' } },
  it: { CategoryDetail: { welcomeDetailCategory: 'Dettaglio categoria' } },
  pt: { CategoryDetail: { welcomeDetailCategory: 'Detalhe da categoria' } },
};

type Locale = keyof typeof messagesMap;

const meta: Meta<typeof WelcomeDetailCategory> = {
  title: 'Atoms/DetailCategory/WelcomeDetailCategory',
  component: WelcomeDetailCategory,
  argTypes: {
    locale: {
      control: 'select',
      options: Object.keys(messagesMap),
      description: 'Idioma para la demo',
    },
  },
  args: { locale: 'es' as Locale },
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

type Story = StoryObj<typeof WelcomeDetailCategory>;
export const Default: Story = {};
