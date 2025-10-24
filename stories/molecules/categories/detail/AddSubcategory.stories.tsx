import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import AddSubcategory from '@molecules/categories/detail/AddSubcategory';
import { type CategoryItem } from '@molecules/categories/detail/CategoryPicker';
import {
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
  SortBy,
  SortOrder,
} from '@graphql/generated';

// Mock data for stories
const mockCategories = [
  {
    __typename: 'Category' as const,
    id: '1',
    name: 'Electronics',
    cover: 'https://via.placeholder.com/150',
    description: 'Electronic devices and gadgets',
    parentId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    subCategories: [],
  },
  {
    __typename: 'Category' as const,
    id: '2',
    name: 'Clothing',
    cover: 'https://via.placeholder.com/150',
    description: 'Fashion andapparel',
    parentId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    subCategories: [],
  },
  {
    __typename: 'Category' as const,
    id: '3',
    name: 'Books',
    cover: 'https://via.placeholder.com/150',
    description: 'Books and literature',
    parentId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    subCategories: [],
  },
];

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
          __typename: 'PaginatedCategoriesType' as const,
          categories: mockCategories,
          total: mockCategories.length,
          hasMore: false,
        },
      } as FindAllCategoriesQuery,
    },
  },
];

const errorMocks = [
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
    error: new globalThis.Error('Failed to fetch categories'),
  },
];

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
          __typename: 'PaginatedCategoriesType' as const,
          categories: [],
          total: 0,
          hasMore: false,
        },
      } as FindAllCategoriesQuery,
    },
  },
];

const loadingMocks = [
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
    delay: 3000, // Simulate loading
    result: {
      data: {
        getAllCategories: {
          __typename: 'PaginatedCategoriesType' as const,
          categories: mockCategories,
          total: mockCategories.length,
          hasMore: false,
        },
      } as FindAllCategoriesQuery,
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
          'A dialog component for adding subcategories to a category. Provides search, filtering, and selection capabilities with support for excluding specific category IDs.',
      },
    },
  },
  argTypes: {
    excludeIds: {
      control: 'object',
      description: 'Array of category IDs to exclude from selection',
    },
    currentCategoryId: {
      control: 'text',
      description: 'Current category ID to prevent self-selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    onAdd: {
      action: 'onAdd',
      description: 'Callback fired when categories are added',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    open: {
      control: 'boolean',
      description: 'External control of open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'External control of open state change',
    },
    mode: {
      control: 'select',
      options: ['category-management', 'product-selection'],
      description: 'Mode to control behavior',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddSubcategory>;

export const Default: Story = {
  args: {
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added:', categories);
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
        story: 'Default state with all categories available for selection.',
      },
    },
  },
};

export const WithExcludedIds: Story = {
  args: {
    excludeIds: ['1', '3'],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (with exclusions):', categories);
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
        story: 'Categories with some IDs excluded from selection.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (disabled):', categories);
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
        story: 'Disabled state where no interactions are allowed.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (loading):', categories);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={loadingMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Loading state while fetching categories.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (error):', categories);
    },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={errorMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Error state when category fetching fails.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (empty):', categories);
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
        story: 'Empty state when no categories are available.',
      },
    },
  },
};

export const ProductSelectionMode: Story = {
  args: {
    mode: 'product-selection',
    excludeIds: [],
    onAdd: (categories: CategoryItem[]) => {
      console.log('Categories added (product selection):', categories);
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
        story: 'Product selection mode with different behavior and styling.',
      },
    },
  },
};
