import type { Meta, StoryObj } from '@storybook/nextjs';
import MainDetailCategory from '@organisms/categories/detail/MainDetailCategory';

const meta: Meta<typeof MainDetailCategory> = {
  title: 'Organisms/Categories/Detail/MainDetailCategory',
  component: MainDetailCategory,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive form component for creating and editing category details including cover image, name, description, and subcategories management.',
      },
    },
  },
  argTypes: {
    isNew: {
      control: 'boolean',
      description:
        'Whether this is a new category creation or editing existing one',
    },
    categoryId: {
      control: 'text',
      description: 'ID of the category being edited',
    },
    onSave: {
      action: 'saved',
      description: 'Callback function called when form is submitted',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainDetailCategory>;

// Default story - New category creation
export const NewCategory: Story = {
  args: {
    isNew: true,
    onSave: async (data) => {
      console.log('Saving new category:', data);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating a new category with empty form fields.',
      },
    },
  },
};

// Edit existing category
export const EditCategory: Story = {
  args: {
    isNew: false,
    categoryId: 'electronics-123',
    initialData: {
      name: 'Electronics',
      description:
        'The latest gadgets and accessories for tech enthusiasts. Discover cutting-edge technology that enhances your digital lifestyle.',
      cover: '/default.webp',
      subCategoryIds: ['1', '2'],
    },
    onSave: async (data) => {
      console.log('Updating category:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Editing an existing category with pre-filled data and subcategories.',
      },
    },
  },
};
