import type { Meta, StoryObj } from '@storybook/react';
import Input from '@atoms/shared/OutsideInput';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Shared/OutsideInput',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'default-input',
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-input',
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
  },
};
