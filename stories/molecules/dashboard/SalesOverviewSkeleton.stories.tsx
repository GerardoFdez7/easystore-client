import type { Meta, StoryObj } from '@storybook/nextjs';
import SalesOverviewSkeleton from '@molecules/dashboard/SalesOverviewSkeleton';

const meta: Meta<typeof SalesOverviewSkeleton> = {
  title: 'Molecules/Dashboard/SalesOverviewSkeleton',
  component: SalesOverviewSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component for the Sales Overview table section in the dashboard. Displays animated skeleton placeholders for the section title and a table with 5 rows showing order information. The table includes skeleton columns for Order ID, Date, Customer, Total, and Status, with a minimum width of 600px for horizontal scrolling on small screens.',
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
          'Default skeleton state displaying a table with 5 order rows. Each row includes placeholders for all columns: order number, date, customer name, total amount, and order status. The table has a rounded border and shadow to match the actual SalesOverview component.',
      },
    },
  },
};

/**
 * Mobile viewport with horizontal scroll
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Sales Overview skeleton on mobile devices. The table maintains its minimum width of 600px, enabling horizontal scrolling for better data visibility on small screens.',
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
          'Sales Overview skeleton on tablet devices, showing the full table width with all columns visible.',
      },
    },
  },
};

/**
 * Desktop viewport with full table width
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Sales Overview skeleton on desktop screens, displaying the complete table structure with optimal spacing and alignment for all columns.',
      },
    },
  },
};

/**
 * Loading state during data fetch
 */
export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the skeleton state that appears when the dashboard is loading recent order data from the backend. This skeleton ensures users see a structured loading state instead of a blank screen.',
      },
    },
  },
};
