import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, FormProvider } from 'react-hook-form';
import VariantsFormField from '@molecules/products/product-detail/VariantsFormField';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

// Wrapper component that provides form context
const VariantsFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: {
    variants: Array<{
      id: string;
      sku: string;
      price: number;
      compareAtPrice?: number;
      costPerItem?: number;
      attributes: Array<{ key: string; value: string }>;
    }>;
  };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { variants: [] },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <VariantsFormField productId="product_123" />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof VariantsFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/VariantsFormField',
  component: VariantsFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for managing product variants. Allows creating, editing, and organizing different variations of a product (e.g., different sizes, colors, configurations). Each variant can have its own pricing, SKU, and attributes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ProductCreationProvider>
        <Story />
      </ProductCreationProvider>
    ),
  ],
  argTypes: {
    defaultValues: {
      description: 'Default form values for variants',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { variants: [] },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state showing the add variant button and instructions.',
      },
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByText('Variants')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('heading', { name: 'No variants yet' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Create First Variant' }),
    ).toBeEnabled();
    await storybookExpect(canvas.queryByRole('table')).toBeNull();
  },
};

export const WithSingleVariant: Story = {
  args: {
    defaultValues: {
      variants: [
        {
          id: 'variant_001',
          sku: 'WH-BLK-001',
          price: 199.99,
          compareAtPrice: 249.99,
          costPerItem: 120.0,
          attributes: [{ key: 'Color', value: 'Black' }],
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a single product variant.',
      },
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(2);
    await storybookExpect(canvas.getByText('WH-BLK-001')).toBeInTheDocument();
    await storybookExpect(canvas.getByText('Color: Black')).toBeInTheDocument();
  },
};

export const WithMultipleVariants: Story = {
  args: {
    defaultValues: {
      variants: [
        {
          id: 'variant_001',
          sku: 'WH-BLK-001',
          price: 199.99,
          compareAtPrice: 249.99,
          attributes: [{ key: 'Color', value: 'Black' }],
        },
        {
          id: 'variant_002',
          sku: 'WH-WHT-001',
          price: 199.99,
          compareAtPrice: 249.99,
          attributes: [{ key: 'Color', value: 'White' }],
        },
        {
          id: 'variant_003',
          sku: 'WH-SLV-001',
          price: 219.99,
          compareAtPrice: 269.99,
          attributes: [{ key: 'Color', value: 'Silver' }],
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Field with multiple product variants demonstrating different colors.',
      },
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(4);
    for (const sku of ['WH-BLK-001', 'WH-WHT-001', 'WH-SLV-001']) {
      await storybookExpect(canvas.getByText(sku)).toBeInTheDocument();
    }
  },
};
