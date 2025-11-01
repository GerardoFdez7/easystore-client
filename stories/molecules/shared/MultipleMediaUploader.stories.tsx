import type { Meta, StoryObj } from '@storybook/nextjs';
import MultipleMediaUploader from '@molecules/shared/MultipleMediaUploader';

const meta: Meta<typeof MultipleMediaUploader> = {
  title: 'Molecules/Shared/MultipleMediaUploader',
  component: MultipleMediaUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onUploadSuccess: { action: 'upload-success' },
    onUploadError: { action: 'upload-error' },
    onMediaProcessed: { action: 'media-processed' },
    disabled: {
      control: 'boolean',
      description: 'Disables the uploader',
    },
    acceptedFileTypes: {
      control: 'object',
      description: 'Array of accepted file types',
    },
    maxImageSize: {
      control: 'number',
      description: 'Maximum image size in bytes',
    },
    maxVideoSize: {
      control: 'number',
      description: 'Maximum video size in bytes',
    },
    minItems: {
      control: 'number',
      description: 'Minimum number of items required',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items allowed',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultipleMediaUploader>;

const mockCallbacks = {
  onUploadSuccess: (url: string, fileId: string) => {
    console.log('Upload success:', { url, fileId });
  },
  onUploadError: (error: string) => {
    console.error('Upload error:', error);
  },
  onMediaProcessed: async (
    processedData?: import('@lib/types/media').ProcessedData | null,
  ) => {
    console.log('Media processed:', processedData);
  },
};

export const Default: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
    ],
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxVideoSize: 50 * 1024 * 1024, // 50MB
    minItems: 1,
    maxItems: 10,
  },
};

export const Disabled: Story = {
  args: {
    ...mockCallbacks,
    disabled: true,
    acceptedFileTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
    ],
    maxImageSize: 10 * 1024 * 1024,
    maxVideoSize: 50 * 1024 * 1024,
    minItems: 1,
    maxItems: 10,
  },
};

export const ImagesOnly: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxVideoSize: 0,
    minItems: 2,
    maxItems: 8,
  },
};

export const VideosOnly: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['video/mp4', 'video/webm', 'video/avi'],
    maxImageSize: 0,
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    minItems: 1,
    maxItems: 5,
  },
};

export const LimitedItems: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageSize: 10 * 1024 * 1024,
    maxVideoSize: 50 * 1024 * 1024,
    minItems: 2,
    maxItems: 3,
  },
};

export const SingleItemAllowed: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
    maxImageSize: 10 * 1024 * 1024,
    maxVideoSize: 50 * 1024 * 1024,
    minItems: 1,
    maxItems: 1,
  },
};

export const ManyItemsAllowed: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
    ],
    maxImageSize: 5 * 1024 * 1024, // Smaller size for many items
    maxVideoSize: 25 * 1024 * 1024, // Smaller size for many items
    minItems: 3,
    maxItems: 20,
  },
};

export const WithCustomDoneButton: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageSize: 10 * 1024 * 1024,
    maxVideoSize: 50 * 1024 * 1024,
    minItems: 2,
    maxItems: 5,
    renderDoneButton: (onDone: () => void, isProcessing: boolean) => (
      <button
        onClick={onDone}
        disabled={isProcessing}
        style={{
          padding: '12px 24px',
          backgroundColor: isProcessing ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {isProcessing ? 'Processing...' : 'Upload Gallery'}
      </button>
    ),
  },
};
