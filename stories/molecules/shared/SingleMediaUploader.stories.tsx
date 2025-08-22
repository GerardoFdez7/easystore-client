import type { Meta, StoryObj } from '@storybook/nextjs';
import SingleMediaUploader from '@molecules/shared/SingleMediaUploader';

const meta: Meta<typeof SingleMediaUploader> = {
  title: 'Molecules/Shared/SingleMediaUploader',
  component: SingleMediaUploader,
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
  },
};

export default meta;

type Story = StoryObj<typeof SingleMediaUploader>;

const mockCallbacks = {
  onUploadSuccess: (url: string, fileId: string) => {
    console.log('Upload success:', { url, fileId });
  },
  onUploadError: (error: string) => {
    console.error('Upload error:', error);
  },
  onMediaProcessed: async (
    processedData?: import('../../../lib/types/media').ProcessedData,
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
  },
};

export const ImagesOnly: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxVideoSize: 0,
  },
};

export const VideosOnly: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['video/mp4', 'video/webm', 'video/avi'],
    maxImageSize: 0,
    maxVideoSize: 100 * 1024 * 1024, // 100MB
  },
};

export const SmallFilesOnly: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png'],
    maxImageSize: 1 * 1024 * 1024, // 1MB
    maxVideoSize: 5 * 1024 * 1024, // 5MB
  },
};

export const WithCustomDoneButton: Story = {
  args: {
    ...mockCallbacks,
    disabled: false,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
    maxImageSize: 10 * 1024 * 1024,
    maxVideoSize: 50 * 1024 * 1024,
    renderDoneButton: (onDone: () => void, isProcessing: boolean) => (
      <button
        onClick={onDone}
        disabled={isProcessing}
        style={{
          padding: '8px 16px',
          backgroundColor: isProcessing ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
        }}
      >
        {isProcessing ? 'Uploading...' : 'Custom Upload'}
      </button>
    ),
  },
};
