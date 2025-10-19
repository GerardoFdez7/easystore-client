import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductsPage from '@templates/Products';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

const meta: Meta<typeof ProductsPage> = {
  title: 'Templates/Products',
  component: ProductsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
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
};

export default meta;

type Story = StoryObj<typeof ProductsPage>;

export const Default: Story = {};
