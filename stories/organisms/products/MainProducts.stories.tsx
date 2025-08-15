import MainProducts from '@organisms/products/MainProducts';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainProducts> = {
  title: 'Organisms/Products/MainProducts',
  component: MainProducts,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MainProducts>;

export const Default: Story = {
  args: {},
};
