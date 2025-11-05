import type { Meta, StoryObj } from '@storybook/nextjs';
import TopProductsSkeleton from '@molecules/dashboard/TopProductsSkeleton';

const meta: Meta<typeof TopProductsSkeleton> = {
  title: 'Molecules/Dashboard/TopProductsSkeleton',
  component: TopProductsSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component for the Top Products section in the dashboard. ',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default Top Products skeleton showing the loading state for best-selling products
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default skeleton state displaying a grid of 10 product cards with animated loading placeholders. Each card includes a 96x96px square image skeleton, product name, brand, and sales metric placeholders. The grid layout adapts responsively based on screen size.',
      },
    },
  },
};

/**
 * Mobile viewport showing 2-column grid
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Top Products skeleton on mobile devices, displaying cards in a 2-column grid with compact spacing for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet viewport showing 3-column grid
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'Top Products skeleton on tablet devices, displaying cards in a 3-column grid layout for better space utilization.',
      },
    },
  },
};

/**
 * Desktop viewport showing 4-column grid
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Top Products skeleton on desktop screens, displaying cards in a 4-column grid with optimal spacing and alignment.',
      },
    },
  },
};

/**
 * Ultra-wide viewport showing 5-column grid
 */
export const UltraWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Top Products skeleton on ultra-wide screens (2xl breakpoint), displaying all 10 cards in a 5-column grid for maximum information density.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '1536px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading state during data fetch
 */
export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the skeleton state that appears when the dashboard is loading top-selling product data from the backend. This provides users with visual feedback during data fetching.',
      },
    },
  },
};
