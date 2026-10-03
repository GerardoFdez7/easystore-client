import {
  expect as storybookExpect,
  fn,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { TypeEnum } from '@graphql/generated';
import { FilterType } from '@lib/types/filter-mode-mapper';
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
    onTypeFilterChange: fn(),
    categoryFilter: [],
    onCategoryFilterChange: fn(),
    viewMode: 'grid',
    onViewModeToggle: fn(),
    searchTerm: '',
    onSearch: fn(),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: fn(),
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Create Product' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('tab', { name: 'All' }),
    ).toHaveAttribute('aria-selected', 'true');

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Search Products' }),
      'phone',
    );
    await waitFor(() =>
      storybookExpect(args.onSearch).toHaveBeenCalledWith('phone'),
    );

    await userEvent.click(
      canvas.getByRole('button', { name: 'Switch to table view' }),
    );
    await storybookExpect(args.onViewModeToggle).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('tab', { name: 'Archived' }));
    await storybookExpect(args.setSelectedFilter).toHaveBeenCalledWith(
      'Archived',
    );
  },
};

export const WithFilters: Story = {
  args: {
    typeFilter: TypeEnum.Physical,
    onTypeFilterChange: fn(),
    categoryFilter: ['electronics'],
    onCategoryFilterChange: fn(),
    viewMode: 'table',
    onViewModeToggle: fn(),
    searchTerm: 'laptop',
    onSearch: fn(),
    selectedFilter: 'Actives' as FilterType,
    setSelectedFilter: fn(),
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Search Products' }),
    ).toHaveValue('laptop');
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Actives' }),
    ).toHaveAttribute('aria-selected', 'true');
    await storybookExpect(
      canvas.getByRole('button', { name: 'Switch to grid view' }),
    ).toBeInTheDocument();
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
    onTypeFilterChange: fn(),
    onCategoryFilterChange: fn(),
    onViewModeToggle: fn(),
    onSearch: fn(),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: fn(),
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Search Products' }),
    ).toHaveValue('product name');
  },
};

export const TableView: Story = {
  args: {
    typeFilter: null,
    onTypeFilterChange: fn(),
    categoryFilter: [],
    onCategoryFilterChange: fn(),
    viewMode: 'table',
    onViewModeToggle: fn(),
    searchTerm: '',
    onSearch: fn(),
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: fn(),
    selectedProducts: [],
    isArchived: false,
    onDeleteComplete: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Switch to grid view' }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('tab', { name: 'Actives' }));
    await storybookExpect(args.setSelectedFilter).toHaveBeenCalledWith(
      'Actives',
    );
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
    onTypeFilterChange: fn(),
    categoryFilter: ['software'],
    onCategoryFilterChange: fn(),
    viewMode: 'table',
    onViewModeToggle: fn(),
    searchTerm: 'premium',
    onSearch: fn(),
    selectedFilter: 'Archived' as FilterType,
    setSelectedFilter: fn(),
    selectedProducts: ['1', '2'],
    isArchived: true,
    onDeleteComplete: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Search Products' }),
    ).toHaveValue('premium');
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Archived' }),
    ).toHaveAttribute('aria-selected', 'true');
    // Selected products reveal the bulk options menu.
    await storybookExpect(
      canvas.getByRole('button', { name: 'Options' }),
    ).toBeInTheDocument();
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
