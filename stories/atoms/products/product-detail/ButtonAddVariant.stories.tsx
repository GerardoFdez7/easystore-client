import type { Meta, StoryObj } from '@storybook/react';
import ButtonAddVariant from '@atoms/products/product-detail/ButtonAddVariant';

const meta: Meta<typeof ButtonAddVariant> = {
  title: 'Atoms/Product Detail/ButtonAddVariant',
  component: ButtonAddVariant,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
