import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductsPage from '@templates/Products';

const meta: Meta<typeof ProductsPage> = {
  title: 'Templates/Products',
  component: ProductsPage,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductsPage>;

export const Default: Story = {};
