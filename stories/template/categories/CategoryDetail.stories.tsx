import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryDetail from '@templates/categories/CategoryDetail';

const meta = {
  title: 'Templates/Category/Detail/CategoryDetail',
  component: CategoryDetail,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    id: 'new',
  },
} satisfies Meta<typeof CategoryDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewCategory: Story = {
  args: { id: 'new' },
};

export const EditCategory: Story = {
  args: { id: 'tech' },
};
