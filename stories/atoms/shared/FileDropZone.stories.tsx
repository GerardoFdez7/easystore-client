import type { Meta, StoryObj } from '@storybook/nextjs';
import FileDropZone from '@atoms/shared/FileDropZone';

const meta: Meta<typeof FileDropZone> = {
  title: 'Atoms/Shared/FileDropZone',
  component: FileDropZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxImageSize: 5,
    maxVideoSize: 50,
    disabled: false,
    multiple: false,
  },
  argTypes: {
    onFileSelect: { action: 'file selected' },
    acceptedFileTypes: {
      control: 'object',
      description: 'Array of accepted MIME types',
    },
    maxImageSize: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Maximum image file size in MB',
    },
    maxVideoSize: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Maximum video file size in MB',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the drop zone',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileDropZone>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'File type not supported. Please select a valid image file.',
  },
};
