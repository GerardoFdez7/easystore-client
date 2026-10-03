import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CardPlan from '@atoms/authentication/confirm-register/CardPlan';

const meta: Meta<typeof CardPlan> = {
  title: 'Atoms/Authentication/ConfirmRegister/CardPlan',
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
      '15 products limit',
      '1 warehouse limit',
      '1 sales page',
      'Forum support',
    ],
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Basic' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getByText('$0')).toBeInTheDocument();
    await storybookExpect(canvas.getAllByRole('listitem')).toHaveLength(4);
    await storybookExpect(canvas.getByText('Forum support')).toBeVisible();
  },
};
