import { expect as storybookExpect, within } from 'storybook/test';
import TabFilterProducts from '@molecules/products/TabFilterProducts';
import { FilterType } from '@lib/types/filter-mode-mapper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TabFilterProducts> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('tablist')).toBeInTheDocument();
  },
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
    setSelectedFilter: () => undefined,
    selectedCount: 0,
    selectedProductIds: [],
    isArchived: false,
  },
};

export const Actives: Story = {
  args: {
    selectedFilter: 'Actives',

    setSelectedFilter: () => undefined,

    selectedCount: 0,
    isArchived: false,
    selectedProductIds: [],
  },
};

export const Archived: Story = {
  args: {
    selectedFilter: 'Archived' as FilterType,
    setSelectedFilter: () => undefined,
    selectedCount: 0,
    selectedProductIds: [],
    isArchived: true,
  },
};
