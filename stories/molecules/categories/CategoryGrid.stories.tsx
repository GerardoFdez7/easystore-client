import type { Meta, StoryObj } from '@storybook/react';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import { NextIntlClientProvider } from 'next-intl';

const messages = { Category: { categoryCount: 'categories' } };

const meta: Meta<typeof CategoryGrid> = {
  title: 'Molecules/Category/CategoryGrid',
  component: CategoryGrid,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div style={{ padding: 16, background: '#f3f4f6' }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryGrid>;
export const Default: Story = {};
