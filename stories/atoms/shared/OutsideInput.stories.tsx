import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from '@atoms/shared/OutsideInput';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Shared/OutsideInput',
  parameters: {
    layout: 'centered',
  },
  component: Input,
  args: { label: 'Email', placeholder: 'Enter your email' },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
