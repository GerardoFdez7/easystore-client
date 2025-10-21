import { ProductTable } from '@molecules/products/ProductTable';
import ProductTableSkeleton from '@molecules/products/ProductTableSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { MediaTypeEnum, TypeEnum, ConditionEnum } from '@graphql/generated';

const meta: Meta<typeof ProductTable> = {
  title: 'Molecules/Products/ProductTable',
  component: ProductTable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    products: { control: 'object' },
    selectedProducts: { control: 'object' },
    onSelectProduct: { action: 'productSelected' },
    onSelectAll: { action: 'allSelected' },
    onAddProduct: { action: 'addProduct' },
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    totalRows: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
    onPreviousPage: { action: 'previousPage' },
    onNextPage: { action: 'nextPage' },
    onFirstPage: { action: 'firstPage' },
    onLastPage: { action: 'lastPage' },
    canPreviousPage: { control: 'boolean' },
    canNextPage: { control: 'boolean' },
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
    onPageChange: (page: number) => console.log('Page changed:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: false,
    canNextPage: true,
  },
};

export const WithSelection: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
    onAddProduct: () => console.log('Add product clicked'),
    currentPage: 1,
    totalPages: 5,
    totalRows: 125,
    onPageChange: (page: number) => console.log('Page changed:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: false,
    canNextPage: true,
  },
};

export const AllSelected: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '2', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
    onSelectAll: (checked: boolean) => console.log('All selected:', checked),
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
    onPageChange: (page: number) => console.log('Page changed:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: false,
    canNextPage: true,
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
    onPageChange: (page: number) => console.log('Page changed:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: true,
    canNextPage: true,
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
    onPageChange: (page: number) => console.log('Page changed:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
    canPreviousPage: true,
    canNextPage: false,
  },
};
