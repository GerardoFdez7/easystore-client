import type { Meta, StoryObj } from '@storybook/nextjs';
import SerialChips from '@molecules/inventory/stock-detail/SerialChips';

const meta: Meta<typeof SerialChips> = {
  title: 'Molecules/StockDetail/SerialChips',
  component: SerialChips,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SerialChips>;

export const Empty: Story = {
  args: {
    serials: [],
  },
};

export const WithSerials: Story = {
  args: {
    serials: ['SN-001', 'SN-002', 'SN-ABC-9999'],
  },
};
