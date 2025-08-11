import type { Meta, StoryObj } from '@storybook/nextjs';
import PlanPremium from '@molecules/confirm-register/PlanPremium';

const meta: Meta<typeof PlanPremium> = {
  title: 'Molecules/ConfirmRegister/PlanPremium',
  component: PlanPremium,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    price: {
      control: 'text',
      description: 'Price',
    },
    selected: {
      control: 'boolean',
      description: 'Marks whether this plan is currently selected.',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback triggered when the plan is selected.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlanPremium>;

export const Default: Story = {
  args: {
    price: '$0',
    selected: false,
  },
};
