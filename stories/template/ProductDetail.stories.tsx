import type { Meta, StoryObj } from '@storybook/react';
import ProductDetail from '@templates/ProductDetail';

const meta: Meta<typeof ProductDetail> = {
  title: 'Templates/Product Detail',
  component: ProductDetail,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductDetail>;

export const Default: Story = {};
