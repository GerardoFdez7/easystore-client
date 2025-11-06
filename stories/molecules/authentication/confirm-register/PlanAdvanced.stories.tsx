import type { Meta, StoryObj } from '@storybook/nextjs';
import PlanAdvanced from '@molecules/authentication/confirm-register/PlanAdvanced';

const meta: Meta<typeof PlanAdvanced> = {
  title: 'Molecules/Authentication/ConfirmRegister/PlanAdvanced',
  component: PlanAdvanced,
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

type Story = StoryObj<typeof PlanAdvanced>;

export const Default: Story = {
  args: {
    price: '$30',
    selected: false,
  },
};
