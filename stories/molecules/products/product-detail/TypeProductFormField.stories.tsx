import { expect as storybookExpect, screen, userEvent } from 'storybook/test';
import { TypeEnum } from '@graphql/generated';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, FormProvider } from 'react-hook-form';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';

// Wrapper component that provides form context
const TypeProductFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { productType: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { productType: TypeEnum.Physical },
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
    defaultValues: { productType: TypeEnum.Physical },
  },
  parameters: {
    docs: {
      description: {
        story: 'Product type set to Physical (default).',
      },
    },
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox', { name: 'Product Type' });
    await storybookExpect(select).toHaveTextContent('Physical');
    await userEvent.click(select);
    await userEvent.click(
      await screen.findByRole('option', { name: 'Digital' }),
    );
    await storybookExpect(select).toHaveTextContent('Digital');
  },
};

export const Digital: Story = {
  args: {
    defaultValues: { productType: TypeEnum.Digital },
  },
  parameters: {
    docs: {
      description: {
        story: 'Product type set to Digital.',
      },
    },
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox', { name: 'Product Type' });
    await storybookExpect(select).toHaveTextContent('Digital');
  },
};
