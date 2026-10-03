import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SpinLoader from '@atoms/shared/SpinLoader';

const meta: Meta<typeof SpinLoader> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('status', { name: 'Loading' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/SpinLoader',
  component: SpinLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the circular loader',
    },
    message: {
      control: 'text',
      description: 'Optional message to display below the loader',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Visual variant of the loader',
    },
    borderWidth: {
      control: 'select',
      options: ['thin', 'normal', 'thick'],
      description: 'Width of the circular border',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
