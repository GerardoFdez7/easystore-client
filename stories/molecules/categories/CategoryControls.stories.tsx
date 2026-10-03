import {
  expect as storybookExpect,
  fn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryControls from '@molecules/categories/CategoryControls';
import { SortBy, SortOrder } from '@graphql/generated';

const meta: Meta<typeof CategoryControls> = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('region', { name: 'Category controls' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('textbox', { name: args.searchPlaceholder }),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Categories/CategoryControls',
  component: CategoryControls,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CategoryControls provides search, sort, and add functionality for category management. It includes responsive layouts for mobile and desktop views.',
      },
    },
  },
  argTypes: {
    searchTerm: {
      control: 'text',
      description: 'Current search term value',
    },
    onSearchChange: {
      description: 'Callback function when search term changes',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    addButtonHref: {
      control: 'text',
      description: 'URL for the add button link',
    },
    addButtonText: {
      control: 'text',
      description: 'Text displayed on the add button',
    },
    showAddButton: {
      control: 'boolean',
      description: 'Whether to show the add button',
    },
    sortBy: {
      control: 'select',
      options: Object.values(SortBy),
      description: 'Current sort field',
    },
    updateSortBy: {
      description: 'Callback function when sort field changes',
    },
    sortOrder: {
      control: 'select',
      options: Object.values(SortOrder),
      description: 'Current sort order (ascending or descending)',
    },
    updateSortOrder: {
      description: 'Callback function when sort order changes',
    },
    onTreeToggle: {
      description: 'Callback function when tree toggle button is clicked',
    },
    treeButtonText: {
      control: 'text',
      description: 'Text displayed on the tree toggle button',
    },
  },
  args: {
    searchTerm: '',
    onSearchChange: fn(),
    updateSortBy: fn(),
    updateSortOrder: fn(),
    searchPlaceholder: 'Search categories...',
    addButtonHref: '/categories/new',
    addButtonText: 'Add Category',
    showAddButton: true,
    sortBy: SortBy.Name,
    sortOrder: SortOrder.Asc,
    onTreeToggle: fn(),
    treeButtonText: 'Category Tree',
  },
  decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof CategoryControls>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <CategoryControls {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('link', { name: 'Add Category' }),
    ).toHaveAttribute('href', '/categories/new');
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Search categories...' }),
      'Phones',
    );
    await waitFor(() =>
      storybookExpect(args.onSearchChange).toHaveBeenCalledWith('Phones'),
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Toggle category tree' }),
    );
    await storybookExpect(args.onTreeToggle).toHaveBeenCalledTimes(1);
  },
};

export const WithSearchTerm: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <CategoryControls {...args} />
    </div>
  ),
  args: {
    searchTerm: 'Electronics',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Search categories...' }),
    ).toHaveValue('Electronics');
  },
};

export const WithoutAddButton: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <CategoryControls {...args} />
    </div>
  ),
  args: {
    showAddButton: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.queryByRole('link', { name: 'Add Category' }),
    ).toBeNull();
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <CategoryControls {...args} />
    </div>
  ),
  args: {
    searchPlaceholder: 'Find your category...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Find your category...' }),
    ).toHaveAttribute('placeholder', 'Find your category...');
  },
};

export const SortByCreatedDate: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <CategoryControls {...args} />
    </div>
  ),
  args: {
    sortBy: SortBy.CreatedAt,
    sortOrder: SortOrder.Desc,
  },
};

export const MobileView: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <CategoryControls {...args} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile layout with stacked controls and full-width elements.',
      },
    },
  },
};

export const DesktopView: Story = {
  render: (args) => (
    <div className="w-full max-w-6xl">
      <CategoryControls {...args} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'Desktop layout with add button on top right and search/sort controls on the same row.',
      },
    },
  },
};
