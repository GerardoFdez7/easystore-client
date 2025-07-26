import type { Meta, StoryObj } from '@storybook/react';
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
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border border-blue-300',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithTooltip: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div title="Notifications">
        <Story />
      </div>
    ),
  ],
};
