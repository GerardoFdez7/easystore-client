import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkPricing from '@atoms/landing/LinkPricing';

const meta: Meta<typeof LinkPricing> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      await within(canvasElement).findByRole('link', { name: 'Pricing' }),
    ).toHaveAttribute('href', '#plans');
  },
  title: 'Atoms/Landing/LinkPricing',
  parameters: {
    layout: 'centered',
  },
  component: LinkPricing,
};

export default meta;

type Story = StoryObj<typeof LinkPricing>;

export const Default: Story = {};
