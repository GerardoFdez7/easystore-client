import type { Meta, StoryObj } from '@storybook/nextjs';
import MobileMenu from '@molecules/landing/MobileMenu';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Landing: { login: 'Log in', pricing: 'Pricing' },
  Languages: {
    English: 'English',
    Spanish: 'Spanish',
    French: 'French',
    Italian: 'Italian',
    Portuguese: 'Portuguese',
  },
};

const meta: Meta<typeof MobileMenu> = {
  title: 'Molecules/Landing/MobileMenu',
  parameters: {
    layout: 'centered',
  },
  component: MobileMenu,
};
export default meta;

type Story = StoryObj<typeof MobileMenu>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="p-4">
        <MobileMenu />
      </div>
    </NextIntlClientProvider>
  ),
};
