import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import NameFormField from '@molecules/products/product-detail/NameFormField';
import { mockProductFormData } from '../mocks/productFormMocks';

// Wrapper component that provides form context
const NameFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { name: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { name: '' },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-2xl space-y-4">
        <NameFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof NameFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/NameFormField',
  component: NameFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for entering the product name. Required field with validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { name: '' },
  },
};

export const WithValue: Story = {
  args: {
    defaultValues: { name: mockProductFormData.name },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field pre-filled with a product name value.',
      },
    },
  },
};

export const LongName: Story = {
  args: {
    defaultValues: {
      name: 'Ultra Premium Wireless Noise-Cancelling Over-Ear Bluetooth Headphones with 40-Hour Battery Life',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a very long product name to test text wrapping.',
      },
    },
  },
};
