import { ProductTable } from '@molecules/products/ProductTable';
import ProductTableSkeleton from '@molecules/products/ProductTableSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  MediaTypeEnum,
  TypeEnum,
  ConditionEnum,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';

const meta: Meta<typeof ProductTable> = {
  title: 'Molecules/Products/ProductTable',
  component: ProductTable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    products: {
      control: 'object',
      description: 'Array of products to display',
    },
    selectedProducts: {
      control: 'object',
      description: 'Array of selected product IDs',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    totalRows: {
      control: { type: 'number', min: 0 },
      description: 'Total number of rows',
    },
    canPreviousPage: {
      control: 'boolean',
      description: 'Whether previous page navigation is enabled',
    },
    canNextPage: {
      control: 'boolean',
      description: 'Whether next page navigation is enabled',
    },
    onSelectProduct: { action: 'productSelected' },
    onSelectAll: { action: 'allSelected' },
    onAddProduct: { action: 'addProduct' },
    onPreviousPage: { action: 'previousPage' },
    onNextPage: { action: 'nextPage' },
    onFirstPage: { action: 'firstPage' },
    onLastPage: { action: 'lastPage' },
    sortBy: { control: 'select', options: Object.values(ProductSortBy) },
    sortOrder: { control: 'select', options: Object.values(SortOrder) },
    onSort: { action: 'sorted' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductTable>;

const mockProducts = [
  {
    id: '1',
    name: 'Phone',
    brand: 'TechCorp',
    cover: '/default.webp',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    isArchived: false,
    longDescription: 'A modern smartphone with advanced features.',
    manufacturer: 'TechCorp Manufacturing',
    productType: TypeEnum.Physical,
    shortDescription: 'A modern smartphone.',
    tags: ['electronics', 'mobile', 'smartphone'],
    categories: [
      {
        categoryId: '1',
        categoryName: 'Electronics',
      },
    ],
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    variants: [
      {
        id: 'variant_1',
        price: 699.99,
        sku: 'PHN-001',
        condition: ConditionEnum.New,
        attributes: [
          {
            key: 'Color',
            value: 'Black',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    brand: 'EcoLife',
    cover: '/default.webp',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    isArchived: false,
    longDescription: 'A sustainable water bottle made from recycled materials.',
    manufacturer: 'EcoLife Products',
    productType: TypeEnum.Physical,
    shortDescription: 'Reusable water bottle.',
    tags: ['eco-friendly', 'sustainable', 'bottle'],
    categories: [
      {
        categoryId: '2',
        categoryName: 'Home & Kitchen',
      },
    ],
    media: [
      {
        id: 'media_002',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    variants: [
      {
        id: 'variant_2',
        price: 24.99,
        sku: 'WTR-002',
        condition: ConditionEnum.New,
        attributes: [
          {
            key: 'Size',
            value: '500ml',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    cover: '/default.webp',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-25T09:30:00Z',
    isArchived: true,
    longDescription: 'Premium noise-cancelling wireless headphones.',
    manufacturer: 'AudioTech Industries',
    productType: TypeEnum.Physical,
    shortDescription: 'Noise-cancelling headphones.',
    tags: ['audio', 'wireless', 'headphones'],
    categories: [
      {
        categoryId: '1',
        categoryName: 'Electronics',
      },
    ],
    variants: [
      {
        id: 'variant_3',
        price: 199.99,
        sku: 'HDN-003',
        condition: ConditionEnum.Used,
        attributes: [
          {
            key: 'Color',
            value: 'White',
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    onAddProduct: () => console.log('Add product clicked'),
    currentPage: 1,
    totalPages: 5,
    totalRows: 125,
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: false,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: (column: ProductSortBy) => console.log('Sort by:', column),
  },
};

export const WithSelectedProducts: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '2', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: (column: ProductSortBy) => console.log('Sort by:', column),
  },
};

// Loading state story using ProductTableSkeleton
export const Loading: Story = {
  render: () => <ProductTableSkeleton />,
};

// Pagination stories
export const FirstPage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    onAddProduct: () => console.log('Add product clicked'),
    currentPage: 1,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: false,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: (column: ProductSortBy) => console.log('Sort by:', column),
  },
};

export const MiddlePage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    onAddProduct: () => console.log('Add product clicked'),
    currentPage: 5,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: true,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: (column: ProductSortBy) => console.log('Sort by:', column),
  },
};

export const LastPage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    onAddProduct: () => console.log('Add product clicked'),
    currentPage: 10,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: true,
    canNextPage: false,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: (column: ProductSortBy) => console.log('Sort by:', column),
  },
};
