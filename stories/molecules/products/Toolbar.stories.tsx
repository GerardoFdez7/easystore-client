import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductsToolbar } from '@molecules/products/Toolbar';
import { TypeEnum } from '@lib/graphql/generated';

// Mock functions for Storybook actions
import type { InputMaybe } from '@lib/graphql/generated';

const onTypeFilterChange = (value: InputMaybe<TypeEnum>) =>
  console.log('Type filter changed:', value);
const onCategoryFilterChange = (value: string) =>
  console.log('Category filter changed:', value);
const onViewModeToggle = () => console.log('View mode toggled');

const meta: Meta<typeof ProductsToolbar> = {
  title: 'Molecules/Products/Toolbar',
  component: ProductsToolbar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    typeFilter: {
      control: 'select',
      options: ['', 'physical', 'digital'],
      description: 'The currently selected product type filter',
    },
    onTypeFilterChange: {
      action: 'typeFilterChanged',
      description: 'Callback when the type filter changes',
    },
    categoryFilter: {
      control: 'text',
      description: 'The currently selected category ID',
    },
    onCategoryFilterChange: {
      action: 'categoryFilterChanged',
      description: 'Callback when the category filter changes',
    },
    viewMode: {
      control: 'radio',
      options: ['table', 'cards'],
      description: 'The current view mode',
    },
    onViewModeToggle: {
      action: 'viewModeToggled',
      description: 'Callback when the view mode is toggled',
    },
  },
  args: {
    typeFilter: undefined,
    onTypeFilterChange,
    categoryFilter: '',
    onCategoryFilterChange,
    viewMode: 'table',
    onViewModeToggle,
  },
};

export default meta;

type Story = StoryObj<typeof ProductsToolbar>;

export const Default: Story = {
  args: {
    typeFilter: undefined,
    categoryFilter: '',
    viewMode: 'table',
  },
};

export const WithTypeFilter: Story = {
  args: {
    typeFilter: TypeEnum.Physical,
    categoryFilter: '',
    viewMode: 'table',
  },
};

export const WithAllFilters: Story = {
  args: {
    typeFilter: TypeEnum.Digital,
    categoryFilter: 'software',
    viewMode: 'cards',
  },
};
