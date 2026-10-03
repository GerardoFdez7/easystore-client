import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PlanEnterprise from '@molecules/authentication/confirm-register/PlanEnterprise';

const meta: Meta<typeof PlanEnterprise> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('$0')).toBeInTheDocument();
  },
  title: 'Molecules/Authentication/ConfirmRegister/PlanEnterprise',
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
