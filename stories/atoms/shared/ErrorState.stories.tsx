import type { Meta, StoryObj } from '@storybook/nextjs';
import ErrorState from '@atoms/shared/ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Atoms/Shared/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    title: {
      control: 'text',
      description: 'Error title to display',
    },
    message: {
      control: 'text',
      description: 'Error message to display',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went wrong',
  },
};
