import type { Meta, StoryObj } from '@storybook/nextjs';
import SortableHeader from '@atoms/shared/SortableHeader';
import { Table, TableHeader, TableRow } from '@shadcn/ui/table';
import { ClockArrowUp, Calendar, Package } from 'lucide-react';

const meta: Meta<typeof SortableHeader> = {
  title: 'Atoms/Shared/SortableHeader',
  component: SortableHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable sortable table header component with generic type support. Displays sort indicators and handles click events for table sorting functionality. Supports custom icons for specific use cases like date fields.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Table className="w-96">
        <TableHeader>
          <TableRow>
            <Story />
          </TableRow>
        </TableHeader>
      </Table>
    ),
  ],
  argTypes: {
    children: {
      description: 'The header content (text)',
      control: { type: 'text' },
    },
    sortKey: {
      description: 'The key to sort by when this header is clicked',
      control: { type: 'text' },
    },
    currentSortBy: {
      description: 'The currently active sort key',
      control: { type: 'text' },
    },
    currentSortOrder: {
      description: 'The current sort order',
      control: { type: 'select' },
      options: ['ASC', 'DESC', 'asc', 'desc'],
    },
    onSort: {
      description: 'Function to call when header is clicked',
      action: 'sorted',
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
    icon: {
      description:
        'Optional icon to display instead of the default MoveUp arrow',
      control: { type: 'select' },
      options: ['MoveUp', 'ClockArrowUp', 'Calendar', 'Package'],
      mapping: {
        MoveUp: undefined,
        ClockArrowUp: ClockArrowUp,
        Calendar: Calendar,
        Package: Package,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default sortable header with no active sort
 */
export const Default: Story = {
  args: {
    children: 'Product Name',
    sortKey: 'name',
    currentSortBy: 'updatedAt',
    currentSortOrder: 'DESC',
    onSort: (column) => console.log('Sort by:', column),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default state showing a sortable header that is not currently active. The sort arrow is hidden until the header becomes active.',
      },
    },
  },
};

/**
 * Active header sorted in ascending order
 */
export const ActiveAscending: Story = {
  args: {
    children: 'Product Name',
    sortKey: 'name',
    currentSortBy: 'name',
    currentSortOrder: 'ASC',
    onSort: (column) => console.log('Sort by:', column),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Active header sorted in ascending order. The arrow points up to indicate ascending sort.',
      },
    },
  },
};

/**
 * Active header sorted in descending order
 */
export const ActiveDescending: Story = {
  args: {
    children: 'Product Name',
    sortKey: 'name',
    currentSortBy: 'name',
    currentSortOrder: 'DESC',
    onSort: (column) => console.log('Sort by:', column),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Active header sorted in descending order. The arrow is rotated 180 degrees to point down.',
      },
    },
  },
};

/**
 * Header with custom icon for date fields
 */
export const WithCustomIcon: Story = {
  args: {
    children: 'Replenishment Date',
    sortKey: 'replenishmentDate',
    currentSortBy: 'replenishmentDate',
    currentSortOrder: 'ASC',
    onSort: (column) => console.log('Sort by:', column),
    icon: ClockArrowUp,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header with a custom ClockArrowUp icon instead of the default MoveUp arrow, useful for date-related fields.',
      },
    },
  },
};

/**
 * Header with calendar icon
 */
export const WithCalendarIcon: Story = {
  args: {
    children: 'Created Date',
    sortKey: 'createdAt',
    currentSortBy: 'createdAt',
    currentSortOrder: 'DESC',
    onSort: (column) => console.log('Sort by:', column),
    icon: Calendar,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header with a Calendar icon, demonstrating how different icons can be used for various field types.',
      },
    },
  },
};

/**
 * Header with package icon for inventory
 */
export const WithPackageIcon: Story = {
  args: {
    children: 'Stock Level',
    sortKey: 'stock',
    currentSortBy: 'stock',
    currentSortOrder: 'ASC',
    onSort: (column) => console.log('Sort by:', column),
    icon: Package,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header with a Package icon, suitable for inventory or stock-related columns.',
      },
    },
  },
};

/**
 * Header with custom styling
 */
export const WithCustomStyling: Story = {
  args: {
    children: 'Custom Header',
    sortKey: 'custom',
    currentSortBy: 'custom',
    currentSortOrder: 'ASC',
    onSort: (column) => console.log('Sort by:', column),
    className: 'bg-blue-50 text-blue-700 font-bold',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header with custom CSS classes applied, demonstrating how additional styling can be added.',
      },
    },
  },
};

/**
 * Multiple headers showing different states
 */
export const MultipleHeaders: Story = {
  decorators: [
    () => (
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <SortableHeader
              sortKey="name"
              currentSortBy="price"
              currentSortOrder="DESC"
              onSort={(column) => console.log('Sort by:', column)}
            >
              Product Name
            </SortableHeader>
            <SortableHeader
              sortKey="price"
              currentSortBy="price"
              currentSortOrder="DESC"
              onSort={(column) => console.log('Sort by:', column)}
            >
              Price
            </SortableHeader>
            <SortableHeader
              sortKey="stock"
              currentSortBy="price"
              currentSortOrder="DESC"
              onSort={(column) => console.log('Sort by:', column)}
              icon={Package}
            >
              Stock
            </SortableHeader>
            <SortableHeader
              sortKey="date"
              currentSortBy="price"
              currentSortOrder="DESC"
              onSort={(column) => console.log('Sort by:', column)}
              icon={Calendar}
            >
              Date
            </SortableHeader>
          </TableRow>
        </TableHeader>
      </Table>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Multiple sortable headers in a table showing different states: inactive, active, and with custom icons.',
      },
    },
  },
};
