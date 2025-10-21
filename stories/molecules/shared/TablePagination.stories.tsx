import type { Meta, StoryObj } from '@storybook/nextjs';

import TablePagination from '@molecules/shared/TablePagination';

const meta: Meta<typeof TablePagination> = {
  title: 'Molecules/Shared/TablePagination',
  component: TablePagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    selectedCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of selected rows',
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
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    selectedCount: 0,
    totalRows: 100,
    canPreviousPage: false,
    canNextPage: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    selectedCount: 0,
    totalRows: 100,
    canPreviousPage: true,
    canNextPage: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    selectedCount: 0,
    totalRows: 100,
    canPreviousPage: true,
    canNextPage: false,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
  },
};

export const WithSelectedRows: Story = {
  args: {
    currentPage: 3,
    totalPages: 8,
    selectedCount: 5,
    totalRows: 80,
    canPreviousPage: true,
    canNextPage: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    selectedCount: 0,
    totalRows: 15,
    canPreviousPage: false,
    canNextPage: false,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onPreviousPage: () => console.log('Previous page'),
    onNextPage: () => console.log('Next page'),
    onFirstPage: () => console.log('First page'),
    onLastPage: () => console.log('Last page'),
  },
};
