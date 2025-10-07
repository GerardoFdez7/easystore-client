import type { Meta, StoryObj } from '@storybook/nextjs';
// import CategoryDetail from '@templates/categories/CategoryDetail';

// Temporary placeholder component since CategoryDetail is commented out
const CategoryDetail = ({ id }: { id: string }) => (
  <div className="p-4">
    <h2>Category Detail Template (Under Development)</h2>
    <p>ID: {id}</p>
  </div>
);

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
