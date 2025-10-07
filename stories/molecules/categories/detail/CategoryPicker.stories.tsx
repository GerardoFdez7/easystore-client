import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryPicker from '@molecules/categories/detail/CategoryPicker';
import {
  mockCategoryItems,
  mockCategoryItemsWithLongNames,
  mockCategoryItemsNoDescription,
  mockCategoryItemsNoTags,
  mockEmptyCategoryItems,
  mockCatalogForPicker,
} from '../mocks/categoryPickerMocks';

const meta: Meta<typeof CategoryPicker> = {
  title: 'Molecules/Category/Detail/CategoryPicker',
  component: CategoryPicker,
  parameters: {
    layout: 'centered',
  },
  args: {
    items: mockCategoryItems,
    catalog: mockCatalogForPicker,
    disabled: false,
  },
  argTypes: {
    items: {
      description: 'Array of selected category items',
      control: { type: 'object' },
    },
    catalog: {
      description: 'Array of available categories for adding new items',
      control: { type: 'object' },
    },
    disabled: {
      description: 'Whether the picker is disabled',
      control: { type: 'boolean' },
    },
    onAdd: {
      description: 'Callback function when categories are added',
    },
    onRemove: {
      description: 'Callback function when a category is removed',
    },
    onOrderChange: {
      description: 'Callback function when order changes',
    },
    onSearch: {
      description: 'Callback function when search is performed',
    },
    onToggleSelect: {
      description: 'Callback function when selection is toggled',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryPicker>;

export const Default: Story = {
  name: 'Default State',
  args: {
    items: mockCategoryItems,
    catalog: mockCatalogForPicker,
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    items: mockEmptyCategoryItems,
    catalog: mockCatalogForPicker,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker when no categories are selected, displaying the empty state message.',
      },
    },
  },
};

export const WithLongNames: Story = {
  name: 'With Long Names',
  args: {
    items: mockCategoryItemsWithLongNames,
    catalog: mockCatalogForPicker,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the component handles very long category names and descriptions with proper truncation.',
      },
    },
  },
};

export const NoDescriptions: Story = {
  name: 'Without Descriptions',
  args: {
    items: mockCategoryItemsNoDescription,
    catalog: mockCatalogForPicker,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker when categories have no descriptions, demonstrating the compact layout.',
      },
    },
  },
};

export const NoTags: Story = {
  name: 'Without Tags',
  args: {
    items: mockCategoryItemsNoTags,
    catalog: mockCatalogForPicker,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker when categories have no tags, focusing on name and description only.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    items: mockCategoryItems,
    catalog: mockCatalogForPicker,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker in a disabled state where no interactions are allowed.',
      },
    },
  },
};

export const NoCatalog: Story = {
  name: 'No Catalog Available',
  args: {
    items: mockCategoryItems,
    catalog: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker when no catalog is available for adding new categories.',
      },
    },
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [mockCategoryItems[0]],
    catalog: mockCatalogForPicker,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the picker with only one selected category.',
      },
    },
  },
};

export const MobileLayout: Story = {
  name: 'Mobile Layout',
  args: {
    items: mockCategoryItems,
    catalog: mockCatalogForPicker,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Shows how the component adapts to mobile screen sizes with responsive layout changes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
};
