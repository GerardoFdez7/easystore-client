import type { Meta, StoryObj } from '@storybook/nextjs';
import CardPlan from '@atoms/confirm-register/CardPlan';

const meta: Meta<typeof CardPlan> = {
  title: 'Atoms/ConfirmRegister/CardPlan',
  component: CardPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Plan title',
    },
    price: {
      control: 'text',
      description: 'Price',
    },
    from: {
      control: 'text',
      description: 'Optional text',
    },
    children: {
      control: false,
      description: 'Optional React node rendered at the bottom',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardPlan>;

export const Default: Story = {
  args: {
    title: 'Basic',
    price: '$0',
    features: [
      '50 products limit',
      '1 warehouse limit',
      '1 sales page',
      'Forum support',
    ],
  },
};
