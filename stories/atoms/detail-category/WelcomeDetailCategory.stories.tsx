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

type StoryArgs = React.ComponentProps<typeof WelcomeDetailCategory> & {
  locale: Locale;
};

const meta: Meta<StoryArgs> = {
  title: 'Atoms/Category/WelcomeDetailCategory',
  render: (args) => (
    <NextIntlClientProvider
      locale={args.locale}
      messages={messagesMap[args.locale]}
    >
      <div style={{ padding: 16 }}>
        <WelcomeDetailCategory name={args.name} />
      </div>
    </NextIntlClientProvider>
  ),
  argTypes: {
    locale: {
      control: 'select',
      options: Object.keys(messagesMap),
      description: 'Idioma para la demo',
    },
    name: { control: 'text' },
  },
  args: {
    locale: 'en',
    name: 'Gaming',
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;
export const Default: Story = {};
