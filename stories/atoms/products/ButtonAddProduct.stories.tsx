import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

const meta: Meta<typeof ButtonAddProduct> = {
  title: 'Atoms/Products/ButtonAddProduct',
  component: ButtonAddProduct,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component for adding new products. Clears any draft data and navigates to the new product creation page.',
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
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ButtonAddProduct>;

export const Default: Story = {
  args: {},
};
