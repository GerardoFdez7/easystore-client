import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MobileMenu from '@molecules/landing/MobileMenu';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

const messages = {
  Landing: { ...enMessages.Landing, login: 'Log in', pricing: 'Pricing' },
  Shared: { ...enMessages.Shared, themeToggle: 'Toggle theme' },
  Languages: {
    English: 'English',
    Spanish: 'Spanish',
    Portuguese: 'Portuguese',
  },
};

const meta: Meta<typeof MobileMenu> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('Open navigation menu'));

    const page = within(document.body);
    await storybookExpect(
      await page.findByRole('link', { name: 'Pricing' }),
    ).toHaveAttribute('href', '#plans');
    await storybookExpect(
      page.queryByRole('button', { name: 'Toggle theme' }),
    ).not.toBeInTheDocument();
  },
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
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <div className="p-4">
        <MobileMenu />
      </div>
    </NextIntlClientProvider>
  ),
};
