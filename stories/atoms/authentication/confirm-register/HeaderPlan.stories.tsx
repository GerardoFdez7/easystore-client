import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderPlan from '@atoms/authentication/confirm-register/HeaderPlan';

const meta: Meta<typeof HeaderPlan> = {
  title: 'Atoms/Authentication/ConfirmRegister/HeaderPlan',
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Basic' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getAllByRole('heading')).toHaveLength(1);
    await storybookExpect(canvas.getByText('$0')).toBeInTheDocument();
    await storybookExpect(canvas.getByText('/month')).toBeInTheDocument();
  },
};

export const Enterprise: Story = {
  args: {
    title: 'Enterprise',
    price: '$100',
    from: 'from',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Enterprise' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getByText('from')).toBeVisible();
    await storybookExpect(canvas.getByText('$100')).toBeInTheDocument();
  },
};
