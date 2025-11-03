import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryTemplate from '@templates/categories/Categories';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllCategoriesDocument,
  FindCategoriesTreeDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import { mockCategories } from '../../molecules/categories/mocks/categoryMocks';

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
        name: '',
        parentId: null,
        sortBy: SortBy.UpdatedAt,
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
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
      },
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
        name: '',
        parentId: null,
        sortBy: SortBy.UpdatedAt,
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
    delay: Infinity, // Simulate loading delay
  },
  {
    request: {
      query: FindCategoriesTreeDocument,
      variables: {
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
      },
    },
    result: {
      data: {
        getAllCategories: {
          categories: [],
        },
      },
    },
    delay: Infinity, // Simulate loading delay
  },
];

const meta: Meta<typeof CategoryTemplate> = {
  title: 'Templates/Category',
  component: CategoryTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CategoryTemplate provides the complete page layout for category management, including header, sidebar, and main category content with search, sorting, and navigation capabilities.',
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

type Story = StoryObj<typeof CategoryTemplate>;

export const Default: Story = {
  args: {
    categoryPath: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default template view showing all root categories with full page layout including header and sidebar.',
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
          'Template view with breadcrumb navigation showing subcategories of a specific path within the full page layout.',
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
          'Loading state showing skeleton placeholders while data is being fetched within the template layout.',
      },
    },
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
          'Empty state when navigating to a category that has no subcategories, showing breadcrumb navigation within the template layout.',
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
          'Empty state when there are no categories at all in the system, showing the main empty state within the template layout.',
      },
    },
  },
};
