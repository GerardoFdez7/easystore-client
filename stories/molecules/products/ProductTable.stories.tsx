import { ProductTable } from '@molecules/products/ProductTable';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { FilterType } from '@atoms/products/TabFilterProducts';

const meta: Meta<typeof ProductTable> = {
  title: 'Molecules/Products/ProductTable',
  component: ProductTable,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    products: { control: 'object' },
    selectedProducts: { control: 'object' },
    onSelectProduct: { action: 'productSelected' },
    onSelectAll: { action: 'allSelected' },
    selectedFilter: {
      control: 'radio',
      options: ['All', 'Actives', 'Archived', 'Physical', 'Digital'],
    },
    setSelectedFilter: { action: 'filterChanged' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductTable>;

const mockProducts = [
  {
    id: '1',
    name: 'Phone',
    status: 'Active',
    inventory: 150,
    category: 'Electronics',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 75,
    category: 'Home & Kitchen',
    cover: '/default.webp',
    media: [
      {
        id: 'media_002',
        url: '/phone.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    status: 'Archived',
    inventory: 25,
    category: 'Electronics',
    cover: '/phone.webp',
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed:', filter),
  },
};

export const WithSelection: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed:', filter),
  },
};

export const AllSelected: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '2', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed:', filter),
  },
};

export const ActivesFilter: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    selectedFilter: 'Actives' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed:', filter),
  },
};
