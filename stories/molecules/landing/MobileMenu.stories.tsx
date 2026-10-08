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
  play: async () => {
    const page = within(document.body);
    const toggle = page.getByLabelText('Open navigation menu');
    await userEvent.click(toggle);

    const pricingLink = await page.findByRole('link', { name: 'Pricing' });
    await storybookExpect(pricingLink).toHaveAttribute('href', '#plans');
    await storybookExpect(toggle).toHaveAttribute('aria-expanded', 'true');

    pricingLink.focus();
    await storybookExpect(pricingLink).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await storybookExpect(toggle).toHaveFocus();
    await storybookExpect(toggle).toHaveAttribute('aria-expanded', 'false');
  },
  title: 'Molecules/Landing/MobileMenu',
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
