import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SingleImagePreview from '@atoms/shared/SingleImagePreview';

const createMockFile = (name: string, size: number = 1024 * 1024): File => {
  const file = new File(['mock file content'], name, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });

  // Override the size property
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });

  return file;
};

const meta: Meta<typeof SingleImagePreview> = {
  title: 'Atoms/Shared/SingleImagePreview',
  component: SingleImagePreview,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  args: {
    onRemove: fn(),
  },
  argTypes: {
    file: {
      control: false,
      description: 'File object to preview',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of the image to display',
    },
    onRemove: {
      control: false,
      description: 'Callback function when remove button is clicked',
    },
    isProcessing: {
      control: 'boolean',
      description: 'Whether the component is in processing state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    viewOnly: {
      control: 'boolean',
      description: 'Whether the component is in view-only mode',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SingleImagePreview>;

// Default state with image URL
export const Default: Story = {
  args: {
    imageUrl: '/portrait_image.webp',
    onRemove: undefined,
    isProcessing: false,
    viewOnly: false,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('img', { name: 'Preview' }),
    ).toBeVisible();
    // Without an onRemove handler there is nothing to remove.
    await storybookExpect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

// Editing state
export const Editing: Story = {
  args: {
    file: createMockFile('priority-file.jpg'),
    imageUrl: '/laptop.webp',
    isProcessing: false,
    viewOnly: false,
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('img', { name: 'Preview' }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Remove image' }));
    await storybookExpect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};

// Uploading state
export const Uploading: Story = {
  args: {
    imageUrl: '/phone.webp',
    isProcessing: true,
    viewOnly: false,
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('img', { name: 'Preview' }),
    ).toBeVisible();
    const remove = canvas.getByRole('button', { name: 'Remove image' });
    await storybookExpect(remove).toBeDisabled();
    await storybookExpect(args.onRemove).not.toHaveBeenCalled();
  },
};
