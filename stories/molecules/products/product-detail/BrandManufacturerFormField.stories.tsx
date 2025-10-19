import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import BrandManufacturerFormField from '@molecules/products/product-detail/BrandManufacturerFormField';
import { mockProductFormData } from '../mocks/productFormMocks';

// Wrapper component that provides form context
const BrandManufacturerFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { brand: string; manufacturer: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { brand: '', manufacturer: '' },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <BrandManufacturerFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof BrandManufacturerFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/BrandManufacturerFormField',
  component: BrandManufacturerFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dual form field component for entering product brand and manufacturer. Fields are displayed side-by-side on larger screens and stacked on mobile.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for brand and manufacturer',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { brand: '', manufacturer: '' },
  },
};

export const WithValues: Story = {
  args: {
    defaultValues: {
      brand: mockProductFormData.brand,
      manufacturer: mockProductFormData.manufacturer,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Fields pre-filled with brand and manufacturer values.',
      },
    },
  },
};

export const BrandOnly: Story = {
  args: {
    defaultValues: {
      brand: 'TechBrand',
      manufacturer: '',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the brand field has a value.',
      },
    },
  },
};

export const ManufacturerOnly: Story = {
  args: {
    defaultValues: {
      brand: '',
      manufacturer: 'Manufacturing Corp.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the manufacturer field has a value.',
      },
    },
  },
};
