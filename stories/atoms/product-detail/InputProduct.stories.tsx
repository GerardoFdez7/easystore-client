import type { Meta, StoryObj } from '@storybook/react';
import InputProduct from '@atoms/product-detail/InputProduct';

const meta: Meta<typeof InputProduct> = {
  title: 'Atoms/Product Detail/InputProduct',
  component: InputProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Product Name',
    placeholder: 'Enter product name',
  },
};
