import type { ReactNode } from 'react';
import {
  expect as storybookExpect,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainProducts from '@organisms/products/MainProducts';
import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { FindAllProductsDocument, ProductFilterMode } from '@graphql/generated';
import { mockProducts } from './mocks/productsMocks';

type ProductsVariables = {
  name?: string | null;
  filterMode?: ProductFilterMode;
};

const productsResponse = (products: typeof mockProducts) => ({
  data: {
    getAllProducts: {
      __typename: 'PaginatedProductsType',
      products: products.map((product) => ({
        ...product,
        __typename: 'Product',
      })),
      total: products.length,
      hasMore: false,
    },
  },
});

/** Applies the same name and archived filters the server would. */
const filterProducts = ({ name, filterMode }: ProductsVariables) =>
  mockProducts.filter((product) => {
    const matchesName =
      !name || product.name.toLowerCase().includes(name.toLowerCase());
    const matchesMode =
      filterMode === ProductFilterMode.Actives
        ? !product.isArchived
        : filterMode === ProductFilterMode.Archives
          ? product.isArchived
          : true;
    return matchesName && matchesMode;
  });

/** Serves every findAllProducts request, whatever its variables. */
const productsMock = (
  result: ApolloMswMocksProps['mocks'][number]['result'],
  delay?: number,
) => ({
  request: { query: FindAllProductsDocument, variables: () => true },
  result,
  delay,
});

type ApolloMswMocksProps = React.ComponentProps<typeof ApolloMswMocks>;

const withProductsApi = (mocks: ApolloMswMocksProps['mocks']) =>
  function ProductsApiDecorator(Story: () => ReactNode) {
    return (
      <ApolloMswMocks mocks={mocks}>
        <ProductsProvider>
          <ProductCreationProvider>
            <Story />
          </ProductCreationProvider>
        </ProductsProvider>
      </ApolloMswMocks>
    );
  };

const meta: Meta<typeof MainProducts> = {
  title: 'Organisms/Products/MainProducts',
  component: MainProducts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main organism for the products page: searching, filtering, sorting, table/grid view modes and product actions. Data comes from ProductsProvider; stories mock the findAllProducts query.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/** All products in the default table view. */
export const Default: Story = {
  decorators: [
    withProductsApi([
      productsMock((variables) =>
        productsResponse(filterProducts(variables as ProductsVariables)),
      ),
    ]),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByText('Wireless Bluetooth Headphones'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Mechanical Gaming Keyboard'),
    ).toBeInTheDocument();
  },
};

/** No products exist yet: shows the empty state with a call to add the first one. */
export const EmptyState: Story = {
  decorators: [withProductsApi([productsMock(productsResponse([]))])],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByText('No products found'),
    ).toBeInTheDocument();
  },
};

/** The products request never resolves, so the table skeleton stays visible. */
export const Loading: Story = {
  decorators: [withProductsApi([productsMock(productsResponse([]), Infinity)])],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('textbox', { name: /search/i }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.queryByText('Wireless Bluetooth Headphones'),
    ).not.toBeInTheDocument();
  },
};

/** Searching narrows the list, and a search with no match shows the filtered empty state. */
export const Filtering: Story = {
  decorators: [
    withProductsApi([
      productsMock((variables) =>
        productsResponse(filterProducts(variables as ProductsVariables)),
      ),
    ]),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const search = await canvas.findByRole('textbox', { name: /search/i });
    await canvas.findByText('Wireless Bluetooth Headphones');

    await userEvent.type(search, 'keyboard');
    await storybookExpect(
      await canvas.findByText('Mechanical Gaming Keyboard'),
    ).toBeInTheDocument();
    await waitFor(() =>
      storybookExpect(
        canvas.queryByText('Wireless Bluetooth Headphones'),
      ).not.toBeInTheDocument(),
    );

    await userEvent.clear(search);
    await userEvent.type(search, 'nonexistent');
    await storybookExpect(
      await canvas.findByText('No products match your filters'),
    ).toBeInTheDocument();
  },
};
