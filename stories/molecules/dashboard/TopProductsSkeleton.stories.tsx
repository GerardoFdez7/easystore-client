import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import TopProductsSkeleton from '@molecules/dashboard/TopProductsSkeleton';

const meta: Meta<typeof TopProductsSkeleton> = {
  title: 'Molecules/Dashboard/TopProductsSkeleton',
  component: TopProductsSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component for the Top Products section in the dashboard. Displays a grid of 10 product card placeholders.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const verifySkeleton: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByRole('heading', { name: 'Top Products' }),
  ).toBeInTheDocument();
  await expect(
    canvasElement.querySelector('[aria-busy="true"]'),
  ).not.toBeNull();
};

export const Default: Story = { play: verifySkeleton };
