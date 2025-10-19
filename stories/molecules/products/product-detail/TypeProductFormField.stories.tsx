import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';

// Wrapper component that provides form context
const TypeProductFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { productType: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { productType: 'Physical' },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <TypeProductFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof TypeProductFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/TypeProductFormField',
  component: TypeProductFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for selecting product type. Allows choosing between Physical and Digital product types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for product type',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Physical: Story = {
  args: {
    defaultValues: { productType: 'Physical' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Product type set to Physical (default).',
      },
    },
  },
};

export const Digital: Story = {
  args: {
    defaultValues: { productType: 'Digital' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Product type set to Digital.',
      },
    },
  },
};
