import ButtonAddProduct from '@atoms/products/ButtonAddProduct';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonAddProduct> = {
  title: 'Atoms/Products/ButtonAddProduct',
  component: ButtonAddProduct,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ButtonAddProduct>;

export const Default: Story = {
  args: {},
};
