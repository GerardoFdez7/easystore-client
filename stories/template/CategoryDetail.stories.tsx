import type { Meta, StoryObj } from '@storybook/react';
import CategoryDetail from '@templates/CategoryDetail';

const meta = {
  title: 'Templates/CategoryDetail',
  component: CategoryDetail,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: 'new',
  },
} satisfies Meta<typeof CategoryDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewCategory: Story = {
  args: { name: 'new' },
};

export const EditCategory: Story = {
  args: { name: 'tech' },
};
