import type { Meta, StoryObj } from '@storybook/react';
import CategoryTemplate from '@templates/categories/Categories';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Category: {
    category: 'Categories',
    welcomeCategory: 'Categories',
    addCategory: 'Add Category',
    searchPlaceholder: 'Search categories...',
    categoryCount: 'categories',
    filters: 'Filters',
  },
};

const meta: Meta<typeof CategoryTemplate> = {
  title: 'Templates/Category',
  component: CategoryTemplate,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryTemplate>;
export const Default: Story = {};
