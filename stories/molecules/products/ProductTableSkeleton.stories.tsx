import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductTableSkeleton from '@molecules/products/ProductTableSkeleton';

const meta: Meta<typeof ProductTableSkeleton> = {
  title: 'Molecules/Products/ProductTableSkeleton',
  component: ProductTableSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A skeleton loading component that matches the ProductTable structure exactly. Shows animated skeleton placeholders for all table columns including checkbox, product info with image, SKU, price, variants, category, and status. Also includes a skeleton for the TablePagination component with responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes to apply to the skeleton container',
      control: { type: 'text' },
    },
    rows: {
      description: 'Number of skeleton rows to display',
      control: { type: 'number', min: 1, max: 50, step: 1 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default skeleton with 25 rows (standard page size)
 */
export const Default: Story = {
  args: {
    rows: 25,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default skeleton state showing 25 rows, matching the standard pagination size used in the ProductTable component.',
      },
    },
  },
};

/**
 * Skeleton with fewer rows for smaller datasets
 */
export const SmallDataset: Story = {
  args: {
    rows: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Skeleton with only 5 rows, useful for smaller datasets or when fewer items are expected.',
      },
    },
  },
};

/**
 * Skeleton with many rows for large datasets
 */
export const LargeDataset: Story = {
  args: {
    rows: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Skeleton with 50 rows, demonstrating how it handles larger datasets while maintaining performance.',
      },
    },
  },
};

/**
 * Minimal skeleton with just a few rows
 */
export const Minimal: Story = {
  args: {
    rows: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal skeleton with only 3 rows, useful for quick loading states or when space is limited.',
      },
    },
  },
};

/**
 * Single row skeleton for individual item loading
 */
export const SingleRow: Story = {
  args: {
    rows: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single row skeleton, useful for demonstrating the structure of individual table rows or for incremental loading scenarios.',
      },
    },
  },
};

/**
 * Skeleton with custom styling
 */
export const WithCustomStyling: Story = {
  args: {
    rows: 10,
    className: 'border-2 border-dashed border-gray-300 rounded-lg p-4',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Skeleton with custom CSS classes applied, demonstrating how additional styling can be added to the component.',
      },
    },
  },
};
