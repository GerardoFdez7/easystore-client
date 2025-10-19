import type { Meta, StoryObj } from '@storybook/nextjs';
import MainProductDetail from '@organisms/products/product-detail/MainProductDetail';
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

const meta: Meta<typeof MainProductDetail> = {
  title: 'Organisms/Products/ProductDetail/MainProductDetail',
  component: MainProductDetail,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main organism component for the product detail page. Provides a comprehensive form for creating and editing products with multiple form fields including media upload, variants, categories, tags, and sustainability information. Uses React Hook Form for state management and validation.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks}>
        <ProductCreationProvider>
          <Story />
        </ProductCreationProvider>
      </MockedProvider>
    ),
  ],
  argTypes: {
    param: {
      description:
        'Product ID parameter - "new" for creating a new product, or a product ID for editing',
      control: { type: 'text' },
    },
    isNew: {
      description:
        'Boolean flag indicating if this is a new product creation or editing an existing product',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * New product creation mode.
 * Displays empty form fields ready for user input to create a new product.
 * Shows all form fields with validation and the "Add" button.
 */
export const NewProduct: Story = {
  args: {
    param: 'new',
    isNew: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'New product creation mode with empty form. All fields are ready for input and the form validates on submission. The save button shows "Add" text for new products.',
      },
    },
  },
};
