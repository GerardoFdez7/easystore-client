import type { Meta, StoryObj } from '@storybook/react';
import Category from '@molecules/product-detail/Category';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Category> = {
  title: 'Molecules/Product Detail/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    setSelectedCategories: fn(),
    removeCategory: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryWrapper = (args: any) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const removeCategory = (index: number) => {
    setSelectedCategories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-96">
      <Category
        {...args}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        removeCategory={removeCategory}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <CategoryWrapper {...args} />,
};
