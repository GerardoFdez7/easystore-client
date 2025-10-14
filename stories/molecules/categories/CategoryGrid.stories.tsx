import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import { mockCategories } from './mocks/categoryMocks';

const meta: Meta<typeof CategoryGrid> = {
  title: 'Molecules/Categories/CategoryGrid',
  component: CategoryGrid,
  decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof CategoryGrid>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto">
      <CategoryGrid {...args} />
    </div>
  ),
  args: {
    categories: mockCategories,
    loading: false,
    limit: 25,
  },
};
export const Loading: Story = {
  render: (args) => (
    <div className="mx-auto">
      <CategoryGrid {...args} />
    </div>
  ),
  args: {
    categories: [],
    loading: true,
    limit: 25,
  },
};
