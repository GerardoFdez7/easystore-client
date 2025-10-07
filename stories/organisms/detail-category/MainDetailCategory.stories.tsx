import type { Meta, StoryObj } from '@storybook/react';
// import MainDetailCategory from '@organisms/categories/detail-category/MainDetailCategory';

// Temporary placeholder component since MainDetailCategory is commented out
const MainDetailCategory = ({ id }: { id: string }) => (
  <div className="p-4">
    <h2>Main Detail Category Component (Under Development)</h2>
    <p>ID: {id}</p>
  </div>
);

const meta = {
  title: 'Organisms/DetailCategory/MainDetailCategory',
  component: MainDetailCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
} satisfies Meta<typeof MainDetailCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {
  args: { id: 'new' },
};

export const EditExisting: Story = {
  args: { id: 'tech' },
};
