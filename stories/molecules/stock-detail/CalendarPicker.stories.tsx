import type { Meta, StoryObj } from '@storybook/nextjs';
import CalendarPicker from '@molecules/inventory/stock-detail/CalendarPicker';

const meta: Meta<typeof CalendarPicker> = {
  title: 'Molecules/StockDetail/CalendarPicker',
  component: CalendarPicker,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CalendarPicker>;

export const Default: Story = {
  args: {
    id: 'replenishment-date',
    value: null,
    placeholder: 'Select a date',
  },
};
