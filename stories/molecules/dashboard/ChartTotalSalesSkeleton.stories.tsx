import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import ChartTotalSales from '@molecules/dashboard/ChartTotalSalesSkeleton';

const meta: Meta<typeof ChartTotalSales> = {
  title: 'Molecules/Dashboard/ChartTotalSalesSkeleton',
  component: ChartTotalSales,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Loading state for the sales timeline. The section title remains visible while its values are loading.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const verifyLoadingState: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('heading', { name: 'Total Sales' }),
  ).toBeInTheDocument();
  await expect(canvas.getByRole('region')).toHaveAttribute('aria-busy', 'true');
  for (const range of canvas.getAllByRole('radio')) {
    await expect(range).toBeDisabled();
  }
};

export const Default: Story = { play: verifyLoadingState };
