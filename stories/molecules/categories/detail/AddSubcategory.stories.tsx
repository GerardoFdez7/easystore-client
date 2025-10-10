import type { Meta, StoryObj } from '@storybook/nextjs';
import AddSubcategoriesPicker from '@molecules/categories/detail/AddSubcategory';
import {
  mockCatalogItems,
  mockEmptyCatalog,
  mockLargeCatalog,
} from '../mocks/addSubcategoryMocks';

const meta: Meta<typeof AddSubcategoriesPicker> = {
  title: 'Molecules/Category/Detail/AddSubcategoriesPicker',
  component: AddSubcategoriesPicker,
  parameters: {
    layout: 'centered',
  },
  args: {
    catalog: mockCatalogItems,
    excludeIds: [],
    disabled: false,
  },
  argTypes: {
    catalog: {
      description: 'Array of available categories to choose from',
      control: { type: 'object' },
    },
    excludeIds: {
      description: 'Array of category IDs to exclude from selection',
      control: { type: 'object' },
    },
    disabled: {
      description: 'Whether the picker is disabled',
      control: { type: 'boolean' },
    },
    onAdd: {
      description: 'Callback function when categories are added',
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddSubcategoriesPicker>;

export const Default: Story = {
  name: 'Default State',
  args: {
    catalog: mockCatalogItems,
    excludeIds: [],
  },
};

export const EmptyCatalog: Story = {
  name: 'Empty Catalog',
  args: {
    catalog: mockEmptyCatalog,
    excludeIds: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker when no categories are available in the catalog.',
      },
    },
  },
};

export const LargeCatalog: Story = {
  name: 'Large Catalog',
  args: {
    catalog: mockLargeCatalog,
    excludeIds: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the picker with a large number of categories, demonstrating scrolling behavior.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    catalog: mockCatalogItems,
    excludeIds: [],
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

export const WithCustomClassName: Story = {
  name: 'With Custom Styling',
  args: {
    catalog: mockCatalogItems,
    excludeIds: [],
    className: 'border-2 border-dashed border-blue-300 p-4 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the picker with custom CSS classes applied.',
      },
    },
  },
};
