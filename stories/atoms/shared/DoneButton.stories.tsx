import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DoneButton from '@atoms/shared/DoneButton';

const meta: Meta<typeof DoneButton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Done|Uploading/ }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/DoneButton',
  component: DoneButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    isProcessing: {
      control: 'boolean',
      description: 'Shows loading state with water fill animation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DoneButton>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Done clicked'),
    isProcessing: false,
    disabled: false,
  },
};

export const Processing: Story = {
  args: {
    onClick: () => console.log('Done clicked'),
    isProcessing: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    onClick: () => console.log('Done clicked'),
    isProcessing: false,
    disabled: true,
  },
};
