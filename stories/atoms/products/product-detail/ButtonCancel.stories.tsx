import type { Meta, StoryObj } from '@storybook/react';
import ButtonCancel from '@atoms/products/product-detail/ButtonCancel';

const meta: Meta<typeof ButtonCancel> = {
  title: 'Atoms/Product Detail/ButtonCancel',
  component: ButtonCancel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
