import { useState } from 'react';
import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import { ProductTable } from '@molecules/products/ProductTable';
import ProductTableSkeleton from '@molecules/products/ProductTableSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  MediaTypeEnum,
  TypeEnum,
  ConditionEnum,
  ProductSortBy,
  SortOrder,
  CurrencyCodes,
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
    currency: CurrencyCodes.Gtq,
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
        price: '699.99',
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
    currency: CurrencyCodes.Gtq,
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
        price: '24.99',
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
    currency: CurrencyCodes.Gtq,
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
        price: '199.99',
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
    onSelectProduct: fn(),
    onSelectAll: fn(),
    onAddProduct: fn(),
    currentPage: 1,
    totalPages: 5,
    totalRows: 125,
    onPreviousPage: fn(),
    onNextPage: fn(),
    onFirstPage: fn(),
    onLastPage: fn(),
    canPreviousPage: false,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(
      mockProducts.length + 1,
    );

    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Select Phone' }),
    );
    await storybookExpect(args.onSelectProduct).toHaveBeenCalledWith('1', true);

    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Select all products' }),
    );
    await storybookExpect(args.onSelectAll).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getByRole('button', { name: 'SKU' }));
    await storybookExpect(args.onSort).toHaveBeenCalledWith(ProductSortBy.Sku);

    await userEvent.click(canvas.getByRole('button', { name: /next/i }));
    await storybookExpect(args.onNextPage).toHaveBeenCalledTimes(1);
  },
};

export const WithSelectedProducts: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '2', '3'],
    onSelectProduct: fn(),
    onSelectAll: fn(),
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('checkbox', { name: 'Select all products' }),
    ).toBeChecked();
    for (const name of [
      'Phone',
      'Eco-Friendly Water Bottle',
      'Wireless Headphones',
    ]) {
      await storybookExpect(
        canvas.getByRole('checkbox', { name: `Select ${name}` }),
      ).toBeChecked();
    }
    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Select Phone' }),
    );
    await storybookExpect(args.onSelectProduct).toHaveBeenCalledWith(
      '1',
      false,
    );
  },
};

// Loading state story using ProductTableSkeleton
export const Loading: Story = {
  render: () => <ProductTableSkeleton />,
  play: async ({ canvas }) => {
    // The skeleton is decorative and hidden from assistive technology.
    await storybookExpect(canvas.queryByRole('table')).toBeNull();
    await storybookExpect(
      canvas.getAllByRole('row', { hidden: true }),
    ).toHaveLength(26);
  },
};

// Pagination stories
export const FirstPage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: fn(),
    onSelectAll: fn(),
    onAddProduct: fn(),
    currentPage: 1,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: fn(),
    onNextPage: fn(),
    onFirstPage: fn(),
    onLastPage: fn(),
    canPreviousPage: false,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: /previous/i }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: /next/i }),
    ).toBeEnabled();
  },
};

export const MiddlePage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: fn(),
    onSelectAll: fn(),
    onAddProduct: fn(),
    currentPage: 5,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: fn(),
    onNextPage: fn(),
    onFirstPage: fn(),
    onLastPage: fn(),
    canPreviousPage: true,
    canNextPage: true,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: /previous/i }));
    await storybookExpect(args.onPreviousPage).toHaveBeenCalledTimes(1);
    await storybookExpect(
      canvas.getByRole('button', { name: /next/i }),
    ).toBeEnabled();
  },
};

export const LastPage: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: fn(),
    onSelectAll: fn(),
    onAddProduct: fn(),
    currentPage: 10,
    totalPages: 10,
    totalRows: 250,
    onPreviousPage: fn(),
    onNextPage: fn(),
    onFirstPage: fn(),
    onLastPage: fn(),
    canPreviousPage: true,
    canNextPage: false,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
    onSort: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: /next/i }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: /previous/i }),
    ).toBeEnabled();
  },
};

function SortableProductTable(
  props: React.ComponentProps<typeof ProductTable>,
) {
  const [sortBy, setSortBy] = useState<ProductSortBy>(ProductSortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const sorted = [...props.products].sort((a, b) => {
    const left = sortBy === ProductSortBy.Sku ? a.variants?.[0].sku : a.name;
    const right = sortBy === ProductSortBy.Sku ? b.variants?.[0].sku : b.name;
    const result = String(left).localeCompare(String(right));
    return sortOrder === SortOrder.Asc ? result : -result;
  });

  return (
    <ProductTable
      {...props}
      products={sorted}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={(column) => {
        setSortOrder(
          column === sortBy && sortOrder === SortOrder.Asc
            ? SortOrder.Desc
            : SortOrder.Asc,
        );
        setSortBy(column);
      }}
    />
  );
}

export const KeyboardSorting: Story = {
  args: { ...Default.args },
  render: (args) => <SortableProductTable {...args} />,
  play: async ({ canvas }) => {
    const firstRowText = () => canvas.getAllByRole('row')[1].textContent ?? '';
    const nameHeader = canvas.getByRole('columnheader', { name: 'Products' });
    const skuHeader = canvas.getByRole('columnheader', { name: 'SKU' });
    await storybookExpect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'none');
    await storybookExpect(firstRowText()).toContain('Eco-Friendly');

    const skuButton = canvas.getByRole('button', { name: 'SKU' });
    skuButton.focus();
    await storybookExpect(skuButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'ascending');
    await storybookExpect(nameHeader).toHaveAttribute('aria-sort', 'none');
    await storybookExpect(firstRowText()).toContain('HDN-003');

    await userEvent.keyboard(' ');
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'descending');
    await storybookExpect(firstRowText()).toContain('WTR-002');
  },
};
