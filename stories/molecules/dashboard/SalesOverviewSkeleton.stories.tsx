import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import SalesOverviewSkeleton from '@molecules/dashboard/SalesOverviewSkeleton';

const meta: Meta<typeof SalesOverviewSkeleton> = {
  title: 'Molecules/Dashboard/SalesOverviewSkeleton',
  component: SalesOverviewSkeleton,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Sales Overview' }),
    ).toBeVisible();
    await expect(canvasElement.querySelectorAll('tbody tr')).toHaveLength(5);
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The original Sales Overview loading component. Its visible title and table headers stay in place while five order rows show loading placeholders.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Sales Overview skeleton showing the loading state for recent orders
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Five loading rows with the same semantic table structure as Sales Overview.',
      },
    },
  },
};
