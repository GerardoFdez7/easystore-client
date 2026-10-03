import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductDetail from '@templates/products/ProductDetail';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Name' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Products/ProductDetail',
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
      <ApolloMswMocks mocks={mocks}>
        <ProductCreationProvider>
          <Story />
        </ProductCreationProvider>
      </ApolloMswMocks>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductDetail>;

export const Default: Story = {};
