import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import StockDetailTemplate from '@templates/inventory/StockDetail';
import { stockDetailMocks } from './mocks/stockDetailMocks';

const meta: Meta<typeof StockDetailTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Stock Detail' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Inventory/StockDetail',
  component: StockDetailTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof StockDetailTemplate>;

export const Default: Story = {
  args: {
    warehouseSku: 'Main Warehouse_SKU-001-RED',
  },
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={stockDetailMocks}>
        <Story />
      </ApolloMswMocks>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Stock detail template for editing existing stock with pre-filled data.',
      },
    },
  },
};
