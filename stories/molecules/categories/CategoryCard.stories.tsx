import type { Meta, StoryObj } from '@storybook/react';
import CategoryCard from '@molecules/categories/CategoryCard';
import { NextIntlClientProvider } from 'next-intl';

const messages = { Category: { categoryCount: 'categories' } };

const meta: Meta<typeof CategoryCard> = {
  title: 'Molecules/Category/CategoryCard',
  component: CategoryCard,
  args: {
    name: 'Technology',
    cover: '/laptop.webp',
    count: 12,
    href: '#',
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div style={{ padding: 16, background: '#f3f4f6', width: 220 }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {};
export const LongName: Story = {
  args: { name: 'Super Ultra Mega Long Category Name That Truncates' },
};
