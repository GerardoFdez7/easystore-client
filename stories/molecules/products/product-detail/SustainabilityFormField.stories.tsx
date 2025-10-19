import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';

// Wrapper component that provides form context
const SustainabilityFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { isSustainable: boolean; sustainabilityDescription: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || {
      isSustainable: false,
      sustainabilityDescription: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <SustainabilityFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof SustainabilityFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/SustainabilityFormField',
  component: SustainabilityFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for marking products as sustainable and providing sustainability information. Includes a checkbox and conditional text area.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for sustainability',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      isSustainable: false,
      sustainabilityDescription: '',
    },
  },
};
