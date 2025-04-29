import type { Meta, StoryObj } from '@storybook/react';
import { ButtonBase } from '@components/atoms/landing/ButtonBase';

const meta = {
  title: 'Atoms/ButtonBase',
  component: ButtonBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'description',
    },
  },
} satisfies Meta<typeof ButtonBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Start Free',
  },
};
