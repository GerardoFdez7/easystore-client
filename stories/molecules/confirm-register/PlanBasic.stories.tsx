import type { Meta, StoryObj } from '@storybook/nextjs';
import PlanBasic from '@molecules/confirm-register/PlanBasic';

const meta: Meta<typeof PlanBasic> = {
  title: 'Molecules/ConfirmRegister/PlanBasic',
  component: PlanBasic,
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

type Story = StoryObj<typeof PlanBasic>;

export const Default: Story = {
  args: {
    price: '$0',
    selected: false,
  },
};
