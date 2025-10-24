import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import CategoryFormField from '@molecules/products/product-detail/CategoryFormField';
import { mockProductFormData } from '../mocks/productFormMocks';

// Wrapper component that provides form context
const CategoryFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: {
    categories: Array<{ categoryId: string; categoryName: string }>;
  };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { categories: [] },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <CategoryFormField name="categories" />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof CategoryFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/CategoryFormField',
  component: CategoryFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for selecting product categories. Supports multiple category selection with search functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for categories',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { categories: [] },
  },
};

export const WithCategories: Story = {
  args: {
    defaultValues: {
      categories: mockProductFormData.categories,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with pre-selected categories.',
      },
    },
  },
};

export const SingleCategory: Story = {
  args: {
    defaultValues: {
      categories: [{ categoryId: 'electronics', categoryName: 'Electronics' }],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a single category selected.',
      },
    },
  },
};

export const MultipleCategories: Story = {
  args: {
    defaultValues: {
      categories: [
        { categoryId: 'electronics', categoryName: 'Electronics' },
        { categoryId: 'audio', categoryName: 'Audio & Video' },
        { categoryId: 'accessories', categoryName: 'Accessories' },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with multiple categories selected.',
      },
    },
  },
};
