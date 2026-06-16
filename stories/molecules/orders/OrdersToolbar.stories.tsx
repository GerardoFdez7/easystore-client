import type { Meta, StoryObj } from '@storybook/nextjs';
import { OrdersToolbar } from '@molecules/orders/OrdersToolbar';

const meta: Meta<typeof OrdersToolbar> = {
  title: 'Molecules/Orders/OrdersToolbar',
  component: OrdersToolbar,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    searchTerm: {
      control: 'text',
      description: 'The current search term',
    },
    onSearch: {
      action: 'search',
      description: 'Callback when search term changes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrdersToolbar>;

export const Default: Story = {
  args: {
    searchTerm: '',
    onSearch: (term) => console.log('Search:', term),
  },
};

export const WithSearchTerm: Story = {
  args: {
    searchTerm: 'ORD-001',
    onSearch: (term) => console.log('Search:', term),
  },
};

export const SearchingCustomer: Story = {
  args: {
    searchTerm: 'Alice Johnson',
    onSearch: (term) => console.log('Search:', term),
  },
};
