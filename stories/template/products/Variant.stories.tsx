import type { Meta, StoryObj } from '@storybook/nextjs';
import VariantTemplate from '@templates/products/Variant';
import { MockedProvider } from '@apollo/client/testing/react';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ProductsProvider } from '@lib/contexts/ProductsContext';

const meta: Meta<typeof VariantTemplate> = {
  title: 'Templates/Products/Variant',
  component: VariantTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]}>
        <ProductsProvider>
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </MockedProvider>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VariantTemplate>;

export const Default: Story = {
  args: {
    productId: 'test-product-id',
    variantId: 'test-variant-id',
    isNew: false,
    isNewProduct: false,
  },
};

export const NewVariant: Story = {
  args: {
    productId: 'test-product-id',
    variantId: undefined,
    isNew: true,
    isNewProduct: false,
  },
};
