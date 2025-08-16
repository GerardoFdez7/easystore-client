import type { Meta, StoryObj } from '@storybook/react';
import Input from '@atoms/shared/OutsideInput';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Shared/OutsideInput',
  component: Input,
  args: { label: 'Email', placeholder: 'Enter your email' },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
