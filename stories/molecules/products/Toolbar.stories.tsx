import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { TypeEnum } from '@graphql/generated';
import { FilterType } from '@atoms/products/TabFilterProducts';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

const meta: Meta<typeof ProductsToolbar> = {
  title: 'Molecules/Products/Toolbar',
  component: ProductsToolbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive toolbar for product management with search, filters, view mode toggle, and add product button. Responsive design adapts to different screen sizes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ProductCreationProvider>
        <Story />
      </ProductCreationProvider>
    ),
  ],
  argTypes: {
    typeFilter: {
      description: 'Current product type filter selection',
      control: { type: 'select' },
      options: [null, TypeEnum.Physical, TypeEnum.Digital],
    },
    onTypeFilterChange: {
      description: 'Callback when type filter changes',
      action: 'typeFilterChanged',
    },
    categoryFilter: {
      description: 'Current category filter selection (array of category IDs)',
      control: { type: 'object' },
    },
    onCategoryFilterChange: {
      description: 'Callback when category filter changes',
      action: 'categoryFilterChanged',
    },
    viewMode: {
      description: 'Current view mode (grid or table)',
      control: { type: 'radio' },
      options: ['grid', 'table'],
    },
    onViewModeToggle: {
      description: 'Callback to toggle between grid and table view',
      action: 'viewModeToggled',
    },
    searchTerm: {
      description: 'Current search term',
      control: { type: 'text' },
    },
    onSearch: {
      description: 'Callback when search term changes',
      action: 'searchChanged',
    },
    selectedFilter: {
      description: 'Current tab filter selection',
      control: { type: 'radio' },
      options: ['All', 'Actives', 'Archived'],
    },
    setSelectedFilter: {
      description: 'Callback when tab filter changes',
      action: 'tabFilterChanged',
    },
    selectedProducts: {
      description: 'Array of selected product IDs',
      control: { type: 'object' },
    },
    isArchived: {
      description: 'Whether selected products are archived',
      control: { type: 'boolean' },
    },
    onDeleteComplete: {
      description: 'Callback when delete operation completes',
      action: 'deleteCompleted',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    typeFilter: null,
    onTypeFilterChange: () => {},
    categoryFilter: [],
    onCategoryFilterChange: () => {},
    viewMode: 'grid',
    onViewModeToggle: () => {},
    searchTerm: '',
    onSearch: () => {},
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: () => {},
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: () => {},
  },
};

export const WithFilters: Story = {
  args: {
    typeFilter: TypeEnum.Physical,
    onTypeFilterChange: () => {},
    categoryFilter: ['electronics'],
    onCategoryFilterChange: () => {},
    viewMode: 'table',
    onViewModeToggle: () => {},
    searchTerm: 'laptop',
    onSearch: () => {},
    selectedFilter: 'Actives' as FilterType,
    setSelectedFilter: () => {},
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with active type and category filters applied.',
      },
    },
  },
};

export const WithSearch: Story = {
  args: {
    typeFilter: undefined,
    categoryFilter: [],
    viewMode: 'table',
    searchTerm: 'product name',
    onTypeFilterChange: () => {},
    onCategoryFilterChange: () => {},
    onViewModeToggle: () => {},
    onSearch: () => {},
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: () => {},
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: () => {},
  },
};

export const TableView: Story = {
  args: {
    typeFilter: null,
    onTypeFilterChange: () => {},
    categoryFilter: [],
    onCategoryFilterChange: () => {},
    viewMode: 'table',
    onViewModeToggle: () => {},
    searchTerm: '',
    onSearch: () => {},
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: () => {},
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Toolbar configured for table view mode.',
      },
    },
  },
};

export const FullyActive: Story = {
  args: {
    typeFilter: TypeEnum.Digital,
    onTypeFilterChange: () => {},
    categoryFilter: ['software'],
    onCategoryFilterChange: () => {},
    viewMode: 'table',
    onViewModeToggle: () => {},
    searchTerm: 'premium',
    onSearch: () => {},
    selectedFilter: 'Archived' as FilterType,
    setSelectedFilter: () => {},
    selectedProducts: ['1', '2'],
    isArchived: true,
    onDeleteComplete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toolbar with all features active: filters, search, and table view.',
      },
    },
  },
};
