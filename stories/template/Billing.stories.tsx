import type { Meta, StoryObj } from '@storybook/nextjs';
import BillingTemplate from '@templates/Billing';

const meta: Meta<typeof BillingTemplate> = {
  component: BillingTemplate,
  title: 'Templates/Billing',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof BillingTemplate>;

export const Default: Story = {};
