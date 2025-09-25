import type { Meta, StoryObj } from '@storybook/nextjs';
import MediaUploader from '@organisms/shared/MediaUploader';
import { MockedProvider } from '@apollo/client/testing/react';
import { GetMediaTokenDocument } from '@graphql/generated';

// Mock data for the GraphQL query
const mocks = [
  {
    request: {
      query: GetMediaTokenDocument,
    },
    result: {
      data: {
        getMediaUploadToken: {
          token: 'mock-token-123',
          expire: Date.now() + 3600000, // 1 hour from now
          signature: 'mock-signature-abc',
          publicKey: 'mock-public-key-xyz',
        },
      },
    },
  },
];

const meta: Meta<typeof MediaUploader> = {
  title: 'Organisms/Shared/MediaUploader',
  component: MediaUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks}>
        <div className="mx-auto max-w-md p-4">
          <Story />
        </div>
      </MockedProvider>
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
    onUploadSuccess: { action: 'upload success' },
    onUploadError: { action: 'upload error' },
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
      description: 'Disable the uploader',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaUploader>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
  },
};

export const CustomFileTypes: Story = {
  args: {
    acceptedFileTypes: ['image/jpeg', 'image/png'],
    maxImageSize: 2,
    maxVideoSize: 20,
  },
};

export const LargeFileLimit: Story = {
  args: {
    maxImageSize: 10,
    maxVideoSize: 100,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500',
  },
};

// Story with error state (mock GraphQL error)
const errorMocks = [
  {
    request: {
      query: GetMediaTokenDocument,
    },
    error: new Error('Authentication failed'),
  },
];

export const AuthenticationError: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={errorMocks}>
        <div className="mx-auto max-w-md p-4">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
};

// Story with loading state
const loadingMocks = [
  {
    request: {
      query: GetMediaTokenDocument,
    },
    delay: 5000, // 5 second delay to show loading state
    result: {
      data: {
        getMediaUploadToken: {
          token: 'mock-token-123',
          expire: Date.now() + 3600000,
          signature: 'mock-signature-abc',
          publicKey: 'mock-public-key-xyz',
        },
      },
    },
  },
];

export const LoadingState: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={loadingMocks}>
        <div className="mx-auto max-w-md p-4">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
};
