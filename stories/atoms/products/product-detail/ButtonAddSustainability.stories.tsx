import type { Meta, StoryObj } from '@storybook/react';
import ButtonAddSustainability from '@atoms/products/product-detail/ButtonAddSustainability';

const meta: Meta<typeof ButtonAddSustainability> = {
  title: 'Atoms/Products/Product Detail/ButtonAddSustainability',
  component: ButtonAddSustainability,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
