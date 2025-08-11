import type { Meta, StoryObj } from '@storybook/nextjs';
import PlanEnterprise from '@molecules/confirm-register/PlanEnterprise';

const meta: Meta<typeof PlanEnterprise> = {
  title: 'Molecules/ConfirmRegister/PlanEnterprise',
  component: PlanEnterprise,
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

type Story = StoryObj<typeof PlanEnterprise>;

export const Default: Story = {
  args: {
    price: '$0',
  },
};
