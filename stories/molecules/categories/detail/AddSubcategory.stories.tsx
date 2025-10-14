import type { Meta, StoryObj } from '@storybook/nextjs';
import AddSubcategory from '@molecules/categories/detail/AddSubcategory';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllCategoriesDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

// Mock categories data for GraphQL responses
const mockCategoriesData = [
  {
    id: '1',
    name: 'Electronics',
    cover: '/laptop.webp',
    parentId: null,
    slug: 'electronics',
    subCategories: [],
  },
  {
    id: '2',
    name: 'Clothing & Fashion',
    cover: '/portrait_image.webp',
    parentId: null,
    slug: 'clothing-fashion',
    subCategories: [],
  },
  {
    id: '3',
    name: 'Home & Garden',
    cover: '/default.webp',
    parentId: null,
    slug: 'home-garden',
    subCategories: [],
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    cover: '/phone.webp',
    parentId: null,
    slug: 'sports-outdoors',
    subCategories: [],
  },
  {
    id: '5',
    name: 'Books & Media',
    cover: '/laptop.webp',
    parentId: null,
    slug: 'books-media',
    subCategories: [],
  },
  {
    id: '6',
    name: 'Automotive',
    cover: '/default.webp',
    parentId: null,
    slug: 'automotive',
    subCategories: [],
  },
  {
    id: '7',
    name: 'Health & Beauty',
    cover: '/portrait_image.webp',
    parentId: null,
    slug: 'health-beauty',
    subCategories: [],
  },
  {
    id: '8',
    name: 'Toys & Games',
    cover: '/phone.webp',
    parentId: null,
    slug: 'toys-games',
    subCategories: [],
  },
];

// Mock for successful categories query
const successMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        name: '',
        parentId: null,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: false,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoriesData,
          total: mockCategoriesData.length,
          hasMore: false,
        },
      },
    },
  },
];

// Mock for empty categories query
const emptyMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        name: '',
        parentId: null,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: false,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: [],
          total: 0,
          hasMore: false,
        },
      },
    },
  },
];

// Mock for large catalog with pagination
const largeCatalogMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        name: '',
        parentId: null,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: false,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoriesData,
          total: 50,
          hasMore: true,
        },
      },
    },
  },
];

const meta: Meta<typeof AddSubcategory> = {
  title: 'Molecules/Categories/Detail/AddSubcategory',
  component: AddSubcategory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AddSubcategory is a dialog/drawer component for selecting and adding subcategories to a parent category. It provides search functionality, infinite scroll, and multi-selection capabilities for category management.',
      },
    },
  },
  argTypes: {
    excludeIds: {
      description: 'Array of category IDs to exclude from selection',
      control: { type: 'object' },
    },
    currentCategoryId: {
      description: 'Current category ID to prevent self-selection',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Whether the component is disabled',
      control: { type: 'boolean' },
    },
    onAdd: {
      description: 'Callback function when categories are added',
      action: 'categories-added',
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddSubcategory>;

export const Default: Story = {
  args: {
    excludeIds: [],
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={successMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Default state of AddSubcategory dialog. Click the trigger button to open the dialog and browse available categories for selection.',
      },
    },
  },
};

export const EmptyCatalog: Story = {
  args: {
    excludeIds: [],
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={emptyMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component when no categories are available in the catalog, displaying an empty state.',
      },
    },
  },
};

export const LargeCatalog: Story = {
  args: {
    excludeIds: [],
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={largeCatalogMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the component with a large catalog that has pagination, showcasing the infinite scroll functionality.',
      },
    },
  },
};

export const WithExcludedIds: Story = {
  args: {
    excludeIds: ['1', '3', '5'],
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={successMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with specific category IDs excluded from selection, useful when certain categories should not be available.',
      },
    },
  },
};

export const WithCurrentCategory: Story = {
  args: {
    currentCategoryId: '2',
    excludeIds: [],
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={successMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the component with a current category ID set to prevent self-selection.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    excludeIds: [],
    disabled: true,
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={successMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component in a disabled state where the trigger button is disabled and no interactions are allowed.',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    excludeIds: [],
    className: 'border-2 border-primary rounded-lg',
    onAdd: (ids: string[]) => {
      console.log('Categories added:', ids);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={successMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the component with custom CSS classes applied for styling customization.',
      },
    },
  },
};
