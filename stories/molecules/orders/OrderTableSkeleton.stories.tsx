import type { Meta, StoryObj } from '@storybook/react';
import OrderTableSkeleton from '@molecules/orders/OrderTableSkeleton';

const meta = {
  title: 'Molecules/Orders/OrderTableSkeleton',
  component: OrderTableSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component that matches the OrderTable structure. Shows animated skeleton rows with the same 7-column layout as the actual orders table: Order Number, Status, Total, Currency, Shipping Method, Customer, and Date. Used to provide visual feedback while order data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the wrapper div',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Number of skeleton rows to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '25' },
      },
    },
  },
} satisfies Meta<typeof OrderTableSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default state with 25 skeleton rows, matching the typical page size for order listings.
 * Shows the full table structure including headers and pagination controls.
 */
export const Default: Story = {
  args: {
    rows: 25,
  },
};

/**
 * Compact view with only 5 skeleton rows, useful for previews or smaller sections.
 * Demonstrates how the skeleton adapts to different row counts.
 */
export const FewRows: Story = {
  args: {
    rows: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a minimal skeleton with only 5 rows. Useful for smaller views or when you want to show less loading content.',
      },
    },
  },
};

/**
 * Extended view with 50 skeleton rows for large data sets.
 * Tests the skeleton behavior with maximum typical pagination size.
 */
export const ManyRows: Story = {
  args: {
    rows: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the skeleton with a large number of rows (50), useful for testing scroll behavior and performance with larger data sets.',
      },
    },
  },
};

/**
 * Single row skeleton, useful for incremental loading scenarios
 * or when adding individual orders to the table.
 */
export const SingleRow: Story = {
  args: {
    rows: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows just a single skeleton row. This can be useful for incremental loading patterns or when demonstrating the basic row structure.',
      },
    },
  },
};

/**
 * Skeleton with custom styling applied via className prop.
 * Demonstrates extensibility of the component.
 */
export const WithCustomClass: Story = {
  args: {
    rows: 10,
    className: 'border-2 border-dashed border-gray-300 rounded-lg p-4',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how additional CSS classes can be applied to customize the appearance of the skeleton wrapper.',
      },
    },
  },
};

/**
 * Typical loading state showing the skeleton during initial data fetch.
 * This represents what users see when first navigating to the orders page.
 */
export const LoadingState: Story = {
  args: {
    rows: 15,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simulates the typical initial loading state when navigating to the orders page. Shows 15 rows which is a common default page size for admin interfaces.',
      },
    },
  },
};
