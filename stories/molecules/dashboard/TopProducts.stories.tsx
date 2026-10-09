import { expect, waitFor, within } from 'storybook/test';
import TopProducts from '@molecules/dashboard/TopProducts';
import type { TopProduct } from '@hooks/domains/dashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TopProducts> = {
  title: 'Molecules/Dashboard/TopProducts',
  component: TopProducts,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopProducts>;

const names = [
  "Women's T-shirt",
  "Men's T-shirt",
  "Women's Hoodie",
  "Men's Hoodie",
  "Women's Sweatpants",
  "Men's Sweatpants",
  'Ceramic mug',
  'Canvas tote bag',
];

const products = names.map((productName, index) => ({
  variantId: `variant-${index + 1}`,
  variantSku: `SKU-${index + 1}`,
  productName,
  productBrand: null,
  variantPrice: { amount: index < 2 ? '25' : '45', currency: 'USD' },
  variantCover: '/laptop.webp',
  productCover: null,
  totalQuantitySold: index + 1,
  totalRevenue: { amount: '45', currency: 'USD' },
  ordersCount: 1,
})) satisfies TopProduct[];

export const Default: Story = {
  args: {
    locale: 'en',
    topProducts: [products[0]],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: "Women's T-shirt" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText(/25.00/)).toBeInTheDocument();
  },
};

export const DenseGrid: Story = {
  args: { locale: 'en', topProducts: products },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Canvas tote bag' }),
    ).toBeInTheDocument();
    await expect(canvas.getAllByRole('heading', { level: 3 })).toHaveLength(8);
  },
};

export const LongNames: Story = {
  args: {
    locale: 'en',
    topProducts: [
      {
        ...products[0],
        productName:
          'Premium oversized heavyweight cotton T-shirt with embroidered detailing',
      },
      products[1],
      products[2],
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', {
        name: /Premium oversized heavyweight cotton/,
      }),
    ).toBeInTheDocument();
  },
};

export const MissingImage: Story = {
  args: {
    locale: 'en',
    topProducts: [{ ...products[0], variantCover: null, productCover: null }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No image')).toBeInTheDocument();
  },
};

export const FailedImage: Story = {
  args: {
    locale: 'en',
    topProducts: [
      { ...products[0], variantCover: '/missing-dashboard-product.webp' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByText('No image')).toBeInTheDocument(),
    );
  },
};

export const Empty: Story = {
  args: { locale: 'en', topProducts: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No top products found')).toBeInTheDocument();
  },
};
