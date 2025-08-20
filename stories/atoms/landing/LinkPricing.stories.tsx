import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkPricing from '@atoms/landing/LinkPricing';

const meta: Meta<typeof LinkPricing> = {
  title: 'Atoms/Landing/LinkPricing',
  parameters: {
    layout: 'centered',
  },
  component: LinkPricing,
};

export default meta;

type Story = StoryObj<typeof LinkPricing>;

export const Default: Story = {};
