import { ProductsToolbar } from '@molecules/products/Toolbar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductsToolbar> = {
  title: 'Molecules/Products/Toolbar',
  component: ProductsToolbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    searchValue: { control: 'text' },
    onSearchChange: { action: 'searchChanged' },
    typeFilter: { control: 'text' },
    onTypeFilterChange: { action: 'typeFilterChanged' },
    categoryFilter: { control: 'text' },
    onCategoryFilterChange: { action: 'categoryFilterChanged' },
    viewMode: {
      control: 'radio',
      options: ['table', 'cards'],
    },
    onViewModeToggle: { action: 'viewModeToggled' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductsToolbar>;

export const Default: Story = {
  args: {
    searchValue: '',
    onSearchChange: (value: string) => console.log('Search changed:', value),
    typeFilter: '',
    onTypeFilterChange: (value: string) =>
      console.log('Type filter changed:', value),
    categoryFilter: '',
    onCategoryFilterChange: (value: string) =>
      console.log('Category filter changed:', value),
    viewMode: 'table',
    onViewModeToggle: () => console.log('View mode toggled'),
  },
};

export const WithSearch: Story = {
  args: {
    searchValue: 'Phone',
    onSearchChange: (value: string) => console.log('Search changed:', value),
    typeFilter: '',
    onTypeFilterChange: (value: string) =>
      console.log('Type filter changed:', value),
    categoryFilter: '',
    onCategoryFilterChange: (value: string) =>
      console.log('Category filter changed:', value),
    viewMode: 'table',
    onViewModeToggle: () => console.log('View mode toggled'),
  },
};

export const WithFilters: Story = {
  args: {
    searchValue: '',
    onSearchChange: (value: string) => console.log('Search changed:', value),
    typeFilter: 'physical',
    onTypeFilterChange: (value: string) =>
      console.log('Type filter changed:', value),
    categoryFilter: 'electronics',
    onCategoryFilterChange: (value: string) =>
      console.log('Category filter changed:', value),
    viewMode: 'cards',
    onViewModeToggle: () => console.log('View mode toggled'),
  },
};
