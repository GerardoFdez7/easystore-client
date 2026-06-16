import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderDetailTemplate from '@templates/orders/OrderDetail';
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

const meta: Meta<typeof OrderDetailTemplate> = {
  title: 'Templates/Orders/Detail/OrderDetail',
  component: OrderDetailTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    param: { control: 'text', description: 'Order number or ID' },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks}>
        <Story />
      </MockedProvider>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof OrderDetailTemplate> = {
  args: {
    param: '12345',
  },
};
