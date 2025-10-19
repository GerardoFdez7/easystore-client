import type { Meta, StoryObj } from '@storybook/nextjs';
import MainProducts from '@organisms/products/MainProducts';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

const meta: Meta<typeof MainProducts> = {
  title: 'Organisms/Products/MainProducts',
  component: MainProducts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main organism component for the products page. Provides comprehensive product management interface with table/grid views, filtering, search, bulk actions, and empty states. Integrates ProductsToolbar, ProductTable, ProductGrid, and EmptyState components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Connects to the real API to fetch products.
 * The display will depend on the products available in the connected backend.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <ProductCreationProvider>
        <ProductsProvider
          initialVariables={{
            page: 1,
            limit: 10,
            includeSoftDeleted: true,
          }}
        >
          <Story />
        </ProductsProvider>
      </ProductCreationProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Connects to the real API through ProductsProvider. Shows actual products from the backend.',
      },
    },
  },
};
