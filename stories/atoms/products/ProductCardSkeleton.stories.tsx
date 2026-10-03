import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductCardSkeleton from '@atoms/products/ProductCardSkeleton';

const meta: Meta<typeof ProductCardSkeleton> = {
  title: 'Atoms/Products/ProductCardSkeleton',
  component: ProductCardSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A skeleton loading component that displays while product data is being fetched. Matches the structure and layout of ProductCard for seamless loading states.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByRole('article', { name: 'Loading product' });
    await storybookExpect(card).toHaveAttribute('aria-busy', 'true');
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default skeleton state showing loading placeholders for product image, name, attributes, price, status, brand, and tags.',
      },
    },
  },
};

export const InGrid: Story = {
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getAllByRole('article', { name: 'Loading product' }),
    ).toHaveLength(5);
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Multiple skeleton cards displayed in a grid layout, demonstrating how they appear during loading states in ProductGrid.',
      },
    },
  },
};

export const SingleCard: Story = {
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getAllByRole('article', { name: 'Loading product' }),
    ).toHaveLength(1);
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Single skeleton card with constrained width to show how it adapts to different container sizes.',
      },
    },
  },
};
