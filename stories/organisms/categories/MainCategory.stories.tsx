import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainCategory from '@organisms/categories/MainCategory';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import {
  FindAllCategoriesDocument,
  FindCategoriesTreeDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import {
  categoriesTreeResult,
  categoriesTreeVariables,
} from '../../molecules/categories/mocks/categoriesTreeQuery';
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

type ListVars = {
  name?: string;
  parentId?: string | null;
  includeSubcategories?: boolean;
};

// Variables must match the hook's request exactly (including key order).
const listRequest = ({
  name = '',
  parentId = null,
  includeSubcategories = true,
}: ListVars = {}) => ({
  query: FindAllCategoriesDocument,
  variables: {
    page: 1,
    limit: 25,
    name,
    parentId,
    sortBy: SortBy.UpdatedAt,
    sortOrder: SortOrder.Asc,
    includeSubcategories,
  },
});

const treeRequest = {
  query: FindCategoriesTreeDocument,
  variables: categoriesTreeVariables(SortOrder.Asc),
};

const listResult = (categories: unknown[]) => ({
  data: {
    getAllCategories: {
      categories,
      total: categories.length,
      hasMore: false,
    },
  },
});

const treeResult = categoriesTreeResult;

const treeMock = {
  request: treeRequest,
  result: treeResult(mockCategoriesWithSubcategories),
};

// Mock data for successful queries
const successMocks = [
  {
    request: listRequest(),
    result: listResult(mockCategoriesWithSubcategories),
  },
  treeMock,
];

// Mock data for loading state
const loadingMocks = [
  {
    request: listRequest(),
    result: listResult(mockEmptyCategories),
    delay: Infinity,
  },
  { request: treeRequest, result: treeResult([]), delay: Infinity },
];

// Mock data for error state
const errorMocks = [
  {
    request: listRequest(),
    error: new globalThis.Error('Failed to fetch categories'),
  },
  {
    request: treeRequest,
    error: new globalThis.Error('Failed to fetch category tree'),
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
      <ApolloMswMocks mocks={parameters?.apolloMocks || successMocks}>
        <div className="bg-background min-h-screen">
          <Story />
        </div>
      </ApolloMswMocks>
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

const doc = (story: string) => ({ docs: { description: { story } } });

export const Default: Story = {
  args: { categoryPath: [] },
  parameters: doc(
    'Default view showing all root categories with search and sorting capabilities.',
  ),
  play: async ({ canvas }) => {
    for (const category of mockCategories) {
      await storybookExpect(
        await canvas.findByText(category.name),
      ).toBeInTheDocument();
    }
    await storybookExpect(
      canvas.getByRole('region', { name: 'Category controls' }),
    ).toBeInTheDocument();
  },
};

export const WithCategoryPath: Story = {
  args: { categoryPath: ['electronics'] },
  parameters: {
    apolloMocks: [
      {
        request: listRequest({ parentId: '1' }),
        result: listResult(mockCategoriesWithSubcategories[0].subCategories),
      },
      treeMock,
    ],
    ...doc(
      'Category view with breadcrumb navigation showing subcategories of a specific path.',
    ),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByText('Electronics Subcategory 1'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Electronics Subcategory 2'),
    ).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { categoryPath: [] },
  parameters: {
    apolloMocks: loadingMocks,
    ...doc(
      'Loading state showing skeleton placeholders while data is being fetched.',
    ),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByRole('region', { name: 'Category controls' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('Electronics')).toBeNull();
    await storybookExpect(canvas.queryByText('No categories yet')).toBeNull();
  },
};

export const Error: Story = {
  args: { categoryPath: [] },
  parameters: {
    apolloMocks: errorMocks,
    ...doc(
      'Failed category requests leave the list empty, so the empty-state call to action is shown instead of stale data.',
    ),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByText('No categories yet'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('Electronics')).toBeNull();
  },
};

export const NoSearchResults: Story = {
  args: { categoryPath: [] },
  parameters: {
    apolloMocks: [
      ...successMocks,
      {
        request: listRequest({
          name: 'nonexistent',
          includeSubcategories: false,
        }),
        result: listResult([]),
      },
    ],
    ...doc(
      'Empty state when search returns no results, showing search-specific empty state with search icon.',
    ),
  },
  play: async ({ canvas }) => {
    // Wait for the unfiltered list so the controls are stable before searching
    await canvas.findByText(mockCategories[0].name);
    const search = canvas.getByRole('textbox', { name: /Search categories/i });
    await userEvent.type(search, 'nonexistent');
    await storybookExpect(search).toHaveValue('nonexistent');
    await storybookExpect(
      await canvas.findByText('No results found'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('Electronics')).toBeNull();
  },
};

export const NoSubcategories: Story = {
  args: { categoryPath: ['electronics-subcategory-1'] },
  parameters: {
    apolloMocks: [
      {
        request: listRequest({ parentId: '11' }),
        result: listResult([]),
      },
      treeMock,
    ],
    ...doc(
      'Empty state when navigating to a category that has no subcategories, showing breadcrumb navigation.',
    ),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByText('No subcategories'),
    ).toBeInTheDocument();
  },
};

export const NoCategories: Story = {
  args: { categoryPath: [] },
  parameters: {
    apolloMocks: [
      { request: listRequest(), result: listResult([]) },
      { request: treeRequest, result: treeResult([]) },
    ],
    ...doc(
      'Empty state when there are no categories at all in the system, showing the main empty state.',
    ),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByText('No categories yet'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Create Category' }),
    ).toBeInTheDocument();
  },
};
