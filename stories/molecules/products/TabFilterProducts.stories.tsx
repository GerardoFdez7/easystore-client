import TabFilterProducts from '@molecules/products/TabFilterProducts';
import { FilterType } from '@lib/types/filter-mode-mapper';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof TabFilterProducts> = {
  title: 'Molecules/Products/TabFilterProducts',
  component: TabFilterProducts,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedFilter: {
      control: 'radio',
      options: ['All', 'Actives', 'Archived', 'Physical', 'Digital'],
    },
    setSelectedFilter: { action: 'filterChanged' },
  },
};
export default meta;

type Story = StoryObj<typeof TabFilterProducts>;

export const All: Story = {
  args: {
    selectedFilter: 'All' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed to:', filter),
  },
};

export const Actives: Story = {
  args: {
    selectedFilter: 'Actives',

    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed to:', filter),

    selectedCount: 0,
    isArchived: {},
    selectedProductIds: {},
  },
};

export const Archived: Story = {
  args: {
    selectedFilter: 'Archived' as FilterType,
    setSelectedFilter: (filter: FilterType) =>
      console.log('Filter changed to:', filter),
  },
};
