import type { Meta, StoryObj } from '@storybook/react';
import ProductDetail from '@templates/products/ProductDetail';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { MockedProvider } from '@apollo/client/testing/react';
import { GetMediaTokenDocument } from '@graphql/generated';

// Mock GraphQL responses
const mocks = [
  {
    request: {
      query: GetMediaTokenDocument,
    },
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

const meta: Meta<typeof ProductDetail> = {
  title: 'Templates/Products/Detail/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks}>
        <ProductCreationProvider>
          <Story />
        </ProductCreationProvider>
      </MockedProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductDetail>;

export const Default: Story = {};
