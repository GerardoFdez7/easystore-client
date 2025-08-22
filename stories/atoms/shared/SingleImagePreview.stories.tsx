import type { Meta, StoryObj } from '@storybook/nextjs';
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
      action: 'remove clicked',
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
};

// Editing state
export const Editing: Story = {
  args: {
    file: createMockFile('priority-file.jpg'),
    imageUrl: '/laptop.webp',
    isProcessing: false,
    viewOnly: false,
  },
};

// Uploading state
export const Uploading: Story = {
  args: {
    imageUrl: '/phone.webp',
    isProcessing: true,
    viewOnly: false,
  },
};
