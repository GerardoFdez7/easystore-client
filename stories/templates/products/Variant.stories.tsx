import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VariantTemplate from '@templates/products/Variant';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ProductsProvider } from '@lib/contexts/ProductsContext';

const meta: Meta<typeof VariantTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Variant detail' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Products/VariantTemplate',
  component: VariantTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={[]}>
        <ProductsProvider>
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </ApolloMswMocks>
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
