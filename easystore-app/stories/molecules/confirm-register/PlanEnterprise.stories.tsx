import type { Meta, StoryObj } from '@storybook/react';
import PlanEnterPrise from '@molecules/confirm-register/PlanEnterPrise';

const meta: Meta<typeof PlanEnterPrise> = {
  title: 'Molecules/ConfirmRegister/PlanEnterPrise',
  component: PlanEnterPrise,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    price: {
      control: 'text',
      description: 'Price',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlanEnterPrise>;

export const Default: Story = {
  args: {
    price: '$0',
  },
};
