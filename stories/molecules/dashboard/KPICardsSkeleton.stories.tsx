import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import KPICardsSkeleton from '@molecules/dashboard/KPICardsSkeleton';

const meta: Meta<typeof KPICardsSkeleton> = {
  title: 'Molecules/Dashboard/KPICardsSkeleton',
  component: KPICardsSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading placeholders for the dashboard KPI cards.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const verifyPlaceholders: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvasElement.querySelectorAll('[data-slot="skeleton"]'),
  ).toHaveLength(8);
  await expect(
    canvasElement.querySelectorAll('[data-slot="card"]'),
  ).toHaveLength(4);
  await expect(canvas.getByText('Sales')).toBeInTheDocument();
  await expect(canvas.getByText('Customers')).toBeInTheDocument();
  await expect(canvas.getByText('Orders')).toBeInTheDocument();
  await expect(canvas.getByText('Average Order Value')).toBeInTheDocument();
  await expect(canvas.queryByText('128')).not.toBeInTheDocument();
};

export const Default: Story = { play: verifyPlaceholders };
