import type { Meta, StoryObj } from '@storybook/nextjs';
import MainProducts from '@organisms/products/MainProducts';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllProductsDocument,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';
import { mockProducts } from './mocks/productsMocks';

// Mock GraphQL responses
const mockEmptyResponse = {
  request: {
    query: FindAllProductsDocument,
    variables: {
      page: 1,
      limit: 25,
      categoriesIds: [],
      sortBy: ProductSortBy.Name,
      sortOrder: 'ASC',
      includeSoftDeleted: false,
      name: '',
    },
  },
  result: {
    data: {
      getAllProducts: {
        __typename: 'PaginatedProductsType',
        products: [],
        total: 0,
        hasMore: false,
      },
    },
  },
};

const mockEmptyFilterResponse = {
  request: {
    query: FindAllProductsDocument,
    variables: {
      page: 1,
      limit: 25,
      categoriesIds: [],
      sortBy: 'NAME',
      sortOrder: 'ASC',
      includeSoftDeleted: false,
      name: 'nonexistent',
    },
  },
  result: {
    data: {
      getAllProducts: {
        __typename: 'PaginatedProductsType',
        products: [],
        total: 0,
        hasMore: false,
      },
    },
  },
};

const mockProductsResponse = {
  request: {
    query: FindAllProductsDocument,
    variables: {
      page: 1,
      limit: 25,
      categoriesIds: [],
      sortBy: 'NAME',
      sortOrder: 'ASC',
      includeSoftDeleted: false,
      name: '',
    },
  },
  result: {
    data: {
      getAllProducts: {
        __typename: 'PaginatedProductsType',
        products: mockProducts.map((product) => ({
          ...product,
          __typename: 'Product',
        })),
        total: mockProducts.length,
        hasMore: false,
      },
    },
  },
};

const meta: Meta<typeof MainProducts> = {
  title: 'Organisms/Products/MainProducts',
  component: MainProducts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main organism component for the products page. Provides a comprehensive interface for managing products including filtering, searching, viewing modes (table/grid), and CRUD operations. Integrates with ProductsProvider for state management and ProductCreationProvider for product creation workflows.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ProductsProvider>
        <ProductCreationProvider>
          <Story />
        </ProductCreationProvider>
      </ProductsProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default state of the MainProducts component.
 * Shows the complete product management interface with all features enabled.
 * Connects to the real API through ProductsProvider.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[mockProductsResponse]}>
        <ProductsProvider
          initialVariables={{
            page: 1,
            limit: 25,
            categoriesIds: [],
            sortBy: ProductSortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSoftDeleted: false,
            name: '',
          }}
        >
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Table view mode displaying products in a structured table format with columns for product details, sorting capabilities, and bulk actions. This is the default view mode.',
      },
    },
  },
};

/**
 * Empty database state - no products exist in the system.
 * Shows the empty state message encouraging users to add their first product.
 */
export const ZeroProductsInDatabase: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[mockEmptyResponse]}>
        <ProductsProvider
          initialVariables={{
            page: 1,
            limit: 25,
            categoriesIds: [],
            sortBy: ProductSortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSoftDeleted: false,
            name: '',
          }}
        >
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Empty database state when no products exist in the system. Displays an empty state message with a call-to-action to add the first product.',
      },
    },
  },
};

/**
 * Empty filter results - products exist but none match the current filter/search.
 * Shows the "no results found" message with suggestions to modify filters.
 */
export const ZeroProductsWhenFiltering: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[mockEmptyFilterResponse]}>
        <ProductsProvider
          initialVariables={{
            page: 1,
            limit: 25,
            categoriesIds: [],
            sortBy: ProductSortBy.Name,
            sortOrder: SortOrder.Asc,
            includeSoftDeleted: false,
            name: 'nonexistent',
          }}
        >
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Empty filter results state when products exist in the database but none match the current search or filter criteria. Shows appropriate messaging to help users adjust their filters.',
      },
    },
  },
};
