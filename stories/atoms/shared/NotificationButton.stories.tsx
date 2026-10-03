import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NotificationButton from '@atoms/shared/NotificationButton';

const meta = {
  title: 'Atoms/Shared/NotificationButton',
  component: NotificationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the button',
    },
  },
} satisfies Meta<typeof NotificationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Notifications' });
    await storybookExpect(button).toBeEnabled();
    await storybookExpect(button.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border border-blue-300',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Notifications' }),
    ).toHaveClass('bg-blue-100', 'border-blue-300');
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Notifications' }),
    ).toBeDisabled();
  },
};
