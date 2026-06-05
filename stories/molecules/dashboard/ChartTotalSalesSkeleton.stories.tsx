import type { Meta, StoryObj } from '@storybook/nextjs';
import ChartTotalSalesSkeleton from '@molecules/dashboard/ChartTotalSalesSkeleton';

const meta: Meta<typeof ChartTotalSalesSkeleton> = {
  title: 'Molecules/Dashboard/ChartTotalSalesSkeleton',
  component: ChartTotalSalesSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component for the Total Sales Chart section in the dashboard. Displays animated skeleton placeholders for the section title, card title, description, and a large chart area. The skeleton uses container queries to match the responsive behavior of the actual ChartTotalSales component.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Chart skeleton showing the loading state for the Total Sales chart
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default skeleton state displaying placeholders for the chart title, revenue amount, time period selector, and a 250px high chart area. The skeleton maintains the same card structure and spacing as the actual ChartTotalSales component.',
      },
    },
  },
};

/**
 * Mobile viewport showing compact layout
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Chart skeleton on mobile devices with responsive padding and container query behavior, ensuring optimal display on smaller screens.',
      },
    },
  },
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'Chart skeleton on tablet devices, maintaining the full chart height and card structure.',
      },
    },
  },
};

/**
 * Desktop viewport with full width
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Chart skeleton on desktop screens with full width display, showing the complete loading state for the revenue chart section.',
      },
    },
  },
};
