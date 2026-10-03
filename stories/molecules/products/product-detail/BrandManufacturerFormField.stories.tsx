import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    const brand = canvas.getByRole('textbox', { name: 'Brand' });
    const manufacturer = canvas.getByRole('textbox', { name: 'Manufacturer' });
    await storybookExpect(brand).toHaveValue('');
    await userEvent.type(brand, 'Acme');
    await userEvent.type(manufacturer, 'Acme Industries');
    await storybookExpect(brand).toHaveValue('Acme');
    await storybookExpect(manufacturer).toHaveValue('Acme Industries');
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Brand' }),
    ).toHaveValue(mockProductFormData.brand);
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Manufacturer' }),
    ).toHaveValue(mockProductFormData.manufacturer);
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Brand' }),
    ).toHaveValue('TechBrand');
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Manufacturer' }),
    ).toHaveValue('');
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Brand' }),
    ).toHaveValue('');
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Manufacturer' }),
    ).toHaveValue('Manufacturing Corp.');
  },
};
