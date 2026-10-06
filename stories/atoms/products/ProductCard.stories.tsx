import { expect as storybookExpect, within } from 'storybook/test';
import { ProductCard } from '@atoms/products/ProductCard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ProductListItem } from '@lib/types/product';
import {
  ConditionEnum,
  MediaTypeEnum,
  TypeEnum,
  CurrencyCodes,
} from '@graphql/generated';

const meta: Meta<typeof ProductCard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText('Eco-Friendly Water Bottle'),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-90">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    product: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

const mockProduct: ProductListItem = {
  id: '1',
  name: 'Eco-Friendly Water Bottle',
  cover: '/phone.webp',
  media: [
    { url: '/default.webp', position: 1, mediaType: MediaTypeEnum.Image },
    { url: '/phone.webp', position: 2, mediaType: MediaTypeEnum.Image },
  ],
  brand: 'EcoLife',
  categories: [{ categoryId: '1', categoryName: 'Home & Kitchen' }],
  tags: ['reusable', 'eco'],
  variants: [
    {
      id: 'v1',
      sku: 'BOTTLE-500-GRN',
      condition: ConditionEnum.New,
      attributes: [{ key: 'Color', value: 'Green' }],
      price: '149.90',
    },
    {
      id: 'v2',
      sku: 'BOTTLE-500-BLU',
      condition: ConditionEnum.New,
      attributes: [{ key: 'Color', value: 'Blue' }],
      price: '149.90',
    },
  ],
  isArchived: false,
  productType: TypeEnum.Physical,
  currency: CurrencyCodes.Gtq,
  shortDescription: 'A reusable eco-friendly water bottle.',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T12:30:00Z',
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const Selected: Story = {
  args: {
    product: mockProduct,
  },
};

export const WithoutMedia: Story = {
  args: {
    product: {
      ...mockProduct,
      media: undefined,
    },
  },
};
