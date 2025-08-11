import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderPlan from '@atoms/confirm-register/HeaderPlan';

const meta: Meta<typeof HeaderPlan> = {
  title: 'Atoms/ConfirmRegister/HeaderPlan',
  component: HeaderPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title',
    },
    price: {
      control: 'text',
      description: 'Price',
    },
    from: {
      control: 'text',
      description: 'From',
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderPlan>;

export const Default: Story = {
  args: {
    title: 'Basic',
    price: '$0',
  },
};

export const Enterprise: Story = {
  args: {
    title: 'Enterprise',
    price: '$100',
    from: 'from',
  },
};
