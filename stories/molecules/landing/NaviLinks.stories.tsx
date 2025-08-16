import type { Meta, StoryObj } from '@storybook/react';
import NaviLinks from '@molecules/landing/NaviLinks';
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

const meta: Meta<typeof NaviLinks> = {
  title: 'Molecules/Landing/NaviLinks',
  component: NaviLinks,
};
export default meta;

type Story = StoryObj<typeof NaviLinks>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="bg-white p-4">
        <NaviLinks />
      </div>
    </NextIntlClientProvider>
  ),
};
