import type { Meta, StoryObj } from '@storybook/react';
import ButtonSave from '@atoms/product-detail/ButtonSave';

const meta: Meta<typeof ButtonSave> = {
  title: 'Atoms/Product Detail/ButtonSave',
  component: ButtonSave,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
