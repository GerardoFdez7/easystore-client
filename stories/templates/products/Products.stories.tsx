import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductsPage from '@templates/products/Products';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ProductFilterMode } from '@graphql/generated';

const meta: Meta<typeof ProductsPage> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: /search/i }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Products/Products',
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
            filterMode: ProductFilterMode.All,
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
