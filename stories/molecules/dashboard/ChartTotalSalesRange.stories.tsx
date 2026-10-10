import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ChartTotalSalesRange } from '@molecules/dashboard/ChartTotalSalesRange';

const meta: Meta<typeof ChartTotalSalesRange> = {
  title: 'Molecules/Dashboard/ChartTotalSalesRange',
  component: ChartTotalSalesRange,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Time range picker for the sales chart. It renders a select when its card container is narrower than 767px and a toggle group when it is wider, so it needs no server data and also appears in the loading skeleton.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('combobox', { name: 'Sales over time' }),
    ).toHaveTextContent('Last 3 months');
  },
};

export const Narrow: Story = {
  args: {
    defaultValue: '30d',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toHaveTextContent(
      'Last 30 days',
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toBeDisabled();
  },
};

export const Wide: Story = {
  decorators: [
    (Story) => (
      <div className="@container/card w-225">
        <Story />
      </div>
    ),
  ],
  args: { defaultValue: '7d' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('combobox')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('radio', { name: 'Last 7 days' }),
    ).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', { name: 'Last 30 days' }));
    await expect(
      canvas.getByRole('radio', { name: 'Last 30 days' }),
    ).toBeChecked();
  },
};
