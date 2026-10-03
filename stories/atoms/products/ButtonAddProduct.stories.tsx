import { expect as storybookExpect, within } from 'storybook/test';
import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';

const meta: Meta<typeof ButtonAddProduct> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Create Product' }),
    ).toBeInTheDocument();
  },
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
