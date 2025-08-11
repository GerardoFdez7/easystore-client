import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';

const meta = {
  title: 'Atoms/Landing/ButtonPrimary',
  component: ButtonPrimary,
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
} satisfies Meta<typeof ButtonPrimary>;

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
