import type { Meta, StoryObj } from '@storybook/react';
import MainCategory from '@organisms/category/MainCategory';
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

const meta: Meta<typeof MainCategory> = {
  title: 'Organisms/Category/MainCategory',
  component: MainCategory,
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

type Story = StoryObj<typeof MainCategory>;
export const Default: Story = {};
