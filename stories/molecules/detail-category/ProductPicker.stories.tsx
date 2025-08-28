import type { Meta, StoryObj } from '@storybook/react';
import ProductPicker, {
  type Product,
} from '@molecules/detail-category/ProductPicker';

const MockItems: Product[] = [
  {
    id: 'p1',
    name: 'Ergo Chair',
    imageUrl: '/laptop.webp',
    status: 'active',
    selected: true,
  },
  {
    id: 'p2',
    name: 'Standing Desk',
    imageUrl: '/laptop.webp',
    status: 'active',
    selected: true,
  },
  {
    id: 'p3',
    name: 'Monitor 27"',
    imageUrl: '/laptop.webp',
    status: 'inactive',
    selected: false,
  },
  {
    id: 'p4',
    name: 'LED Desk Lamp',
    imageUrl: '/laptop.webp',
    status: 'active',
    selected: false,
  },
];

const meta = {
  title: 'Molecules/DetailCategory/ProductPicker',
  component: ProductPicker,
  args: {
    items: MockItems,
    disabled: false,
    onToggleSelect: (id: string, value: boolean) =>
      console.log('onToggleSelect', { id, value }),
    onRemove: (id: string) => console.log('onRemove', { id }),
    onExplore: () => console.log('onExplore'),
    onOrderChange: (order: 'asc' | 'desc') =>
      console.log('onOrderChange', { order }),
    onSearch: (q: string) => console.log('onSearch', { q }),
    onShowMore: () => console.log('onShowMore'),
  },
} satisfies Meta<typeof ProductPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
