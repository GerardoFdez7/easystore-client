import type { Meta, StoryObj } from '@storybook/nextjs';
import MainDetailCategory from '@organisms/categories/detail/MainDetailCategory';
import { type CategoryItem } from '@molecules/categories/detail/CategoryPicker';

// Mock data for catalog
const mockCatalog: CategoryItem[] = [
  {
    id: '1',
    name: 'Smartphones',
    cover: '/phone.webp',
    description: 'Latest mobile devices and accessories',
    count: 25,
  },
  {
    id: '2',
    name: 'Laptops',
    cover: '/laptop.webp',
    description: 'High-performance computing devices',
    count: 18,
  },
  {
    id: '3',
    name: 'Tablets',
    cover: '/default.webp',
    description: 'Portable touchscreen devices',
    count: 12,
  },
  {
    id: '4',
    name: 'Accessories',
    cover: '/default.webp',
    description: 'Tech accessories and peripherals',
    count: 45,
  },
];

const meta: Meta<typeof MainDetailCategory> = {
  title: 'Organisms/Categories/MainDetailCategory',
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
    catalog: {
      control: 'object',
      description: 'Available categories that can be added as subcategories',
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
    catalog: mockCatalog,
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
    catalog: mockCatalog,
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

// Category with many subcategories
export const CategoryWithManySubcategories: Story = {
  args: {
    isNew: false,
    categoryId: 'tech-456',
    catalog: mockCatalog,
    initialData: {
      name: 'Technology',
      description:
        'Comprehensive technology category covering all digital devices and accessories.',
      cover: '/default.webp',
      subCategoryIds: mockCatalog.map((item) => item.id),
    },
    onSave: async (data) => {
      console.log('Updating category with many subcategories:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Category with multiple subcategories to test the CategoryPicker component.',
      },
    },
  },
};

// Empty catalog scenario
export const EmptyCatalog: Story = {
  args: {
    isNew: true,
    catalog: [],
    onSave: async (data) => {
      console.log('Saving category with empty catalog:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Creating a category when no subcategories are available in the catalog.',
      },
    },
  },
};

// Form validation showcase
export const ValidationShowcase: Story = {
  args: {
    isNew: true,
    catalog: mockCatalog,
    onSave: async (data) => {
      console.log('Form data:', data);
      // Simulate validation error
      throw new Error('Validation failed for demonstration');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates form validation states and error handling. Try submitting with empty required fields.',
      },
    },
  },
  play: async ({ _canvasElement }) => {
    // This story is meant for manual testing of validation
    console.log(
      'Try submitting the form with empty fields to see validation in action',
    );
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    isNew: false,
    categoryId: 'loading-789',
    catalog: mockCatalog,
    initialData: {
      name: 'Sample Category',
      description: 'This category is being saved...',
      cover: '/default.webp',
      subCategoryIds: [],
    },
    onSave: async (data) => {
      console.log('Simulating long save operation:', data);
      // Simulate long API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the loading state during form submission. The save button will show a loading spinner.',
      },
    },
  },
};
