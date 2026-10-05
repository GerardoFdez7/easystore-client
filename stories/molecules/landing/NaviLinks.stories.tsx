import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NaviLinks from '@molecules/landing/NaviLinks';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

const messages = {
  Landing: { login: 'Log in', pricing: 'Pricing' },
  Shared: { themeToggle: 'Toggle theme' },
  Languages: {
    English: 'English',
    Spanish: 'Spanish',
    Portuguese: 'Portuguese',
  },
};

const meta: Meta<typeof NaviLinks> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pricing = await canvas.findByRole('link', { name: 'Pricing' });

    await storybookExpect(pricing).toHaveAttribute('href', '#plans');
    await storybookExpect(
      canvas.queryByRole('button', { name: 'Toggle theme' }),
    ).not.toBeInTheDocument();
  },
  title: 'Molecules/Landing/NaviLinks',
  parameters: {
    layout: 'centered',
  },
  component: NaviLinks,
};
export default meta;

type Story = StoryObj<typeof NaviLinks>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <div className="bg-white p-4">
        <NaviLinks />
      </div>
    </NextIntlClientProvider>
  ),
};
