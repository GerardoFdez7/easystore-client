import type { Meta, StoryObj } from '@storybook/react';
import CategoryDetail from '@templates/categories/CategoryDetail';

const meta = {
  title: 'Templates/CategoryDetail',
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
