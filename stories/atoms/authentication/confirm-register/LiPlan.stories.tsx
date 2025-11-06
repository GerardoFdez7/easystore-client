import type { Meta, StoryObj } from '@storybook/nextjs';
import LiPlan from '@atoms/authentication/confirm-register/LiPlan';

const meta: Meta<typeof LiPlan> = {
  title: 'Atoms/Authentication/ConfirmRegister/LiPlan',
  component: LiPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The feature description',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LiPlan>;

export const Default: Story = {
  args: {
    text: '50 products limit',
  },
};
