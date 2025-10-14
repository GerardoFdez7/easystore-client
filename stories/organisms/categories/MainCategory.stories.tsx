import type { Meta, StoryObj } from '@storybook/nextjs';
import MainCategory from '@organisms/categories/MainCategory';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllCategoriesDocument,
  FindCategoriesTreeDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import {
  mockCategories,
  mockEmptyCategories,
} from '../../molecules/categories/mocks/categoryMocks';

// Enhanced mock categories with proper GraphQL structure
const mockCategoriesWithSubcategories = mockCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  cover: cat.cover,
  parentId: null,
  slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
  subCategories: [
    {
      id: `${cat.id}1`,
      name: `${cat.name} Subcategory 1`,
      cover: cat.cover,
      parentId: cat.id,
      slug: `${cat.name.toLowerCase().replace(/\s+/g, '-')}-sub1`,
      subCategories: [],
    },
    {
      id: `${cat.id}2`,
      name: `${cat.name} Subcategory 2`,
      cover: cat.cover,
      parentId: cat.id,
      slug: `${cat.name.toLowerCase().replace(/\s+/g, '-')}-sub2`,
      subCategories: [],
    },
  ],
}));

// Mock data for successful queries
const successMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: true,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoriesWithSubcategories,
          total: mockCategoriesWithSubcategories.length,
          hasMore: true,
        },
      },
    },
  },
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoriesWithSubcategories,
          total: mockCategoriesWithSubcategories.length,
          hasMore: true,
        },
      },
    },
  },
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockCategoriesWithSubcategories,
        },
      },
    },
  },
];

// Mock data for loading state
const loadingMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: true,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: mockEmptyCategories,
          total: 0,
          hasMore: false,
        },
      },
    },
    delay: Infinity, // Simulate loading delay
  },
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    result: {
      data: {
        getAllCategories: {
          categories: [],
        },
      },
    },
    delay: Infinity,
  },
];

// Mock data for error state
const errorMocks = [
  {
    request: {
      query: FindAllCategoriesDocument,
      variables: {
        page: 1,
        limit: 25,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSubcategories: true,
      },
    },
    error: {
      name: 'GraphQLError',
      message: 'Failed to fetch categories',
    },
  },
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {},
    },
    error: {
      name: 'GraphQLError',
      message: 'Failed to fetch category tree',
    },
  },
];

const meta: Meta<typeof MainCategory> = {
  title: 'Organisms/Categories/MainCategory',
  component: MainCategory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MainCategory displays a comprehensive category management interface with search, sorting, grid view, and tree navigation. It supports hierarchical category browsing and management.',
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <MockedProvider mocks={parameters?.apolloMocks || successMocks}>
        <div className="bg-background min-h-screen">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
  argTypes: {
    categoryPath: {
      control: 'object',
      description:
        'Array of category slugs representing the current category path',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof MainCategory>;

export const Default: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default view showing all root categories with search and sorting capabilities.',
      },
    },
  },
};

export const WithCategoryPath: Story = {
  args: {
    categoryPath: ['electronics', 'computers'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Category view with breadcrumb navigation showing subcategories of a specific path.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    apolloMocks: loadingMocks,
    docs: {
      description: {
        story:
          'Loading state showing skeleton placeholders while data is being fetched.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    apolloMocks: errorMocks,
    docs: {
      description: {
        story:
          'Error state displaying an error message when category data fails to load.',
      },
    },
  },
};

export const NoSearchResults: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    apolloMocks: [
      {
        request: {
          query: FindAllCategoriesDocument,
          variables: {
            page: 1,
            limit: 25,
            sortBy: SortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSubcategories: false,
            name: 'nonexistent',
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
      {
        request: {
          query: FindCategoriesTreeDocument,
          variables: {},
        },
        result: {
          data: {
            getAllCategories: {
              categories: mockCategoriesWithSubcategories,
            },
          },
        },
      },
    ],
    docs: {
      description: {
        story:
          'Empty state when search returns no results, showing search-specific empty state with search icon.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Simulate user typing in search input
    const searchInput = canvasElement.querySelector(
      'input[placeholder*="search" i]',
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.value = 'nonexistent';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

export const NoSubcategories: Story = {
  args: {
    categoryPath: ['electronics', 'computers'],
  },
  parameters: {
    apolloMocks: [
      {
        request: {
          query: FindAllCategoriesDocument,
          variables: {
            page: 1,
            limit: 25,
            sortBy: SortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSubcategories: true,
            parentId: 'electronics1',
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
      {
        request: {
          query: FindCategoriesTreeDocument,
          variables: {},
        },
        result: {
          data: {
            getAllCategories: {
              categories: mockCategoriesWithSubcategories,
            },
          },
        },
      },
    ],
    docs: {
      description: {
        story:
          'Empty state when navigating to a category that has no subcategories, showing breadcrumb navigation.',
      },
    },
  },
};

export const NoCategories: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    apolloMocks: [
      {
        request: {
          query: FindAllCategoriesDocument,
          variables: {
            page: 1,
            limit: 25,
            sortBy: SortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSubcategories: true,
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
      {
        request: {
          query: FindCategoriesTreeDocument,
          variables: {},
        },
        result: {
          data: {
            getAllCategories: {
              categories: [],
            },
          },
        },
      },
    ],
    docs: {
      description: {
        story:
          'Empty state when there are no categories at all in the system, showing the main empty state.',
      },
    },
  },
};
