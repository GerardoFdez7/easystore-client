import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CalendarPicker from '@molecules/inventory/stock-detail/CalendarPicker';

const meta: Meta<typeof CalendarPicker> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByPlaceholderText('Select a date'),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Inventory/Detail/CalendarPicker',
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
