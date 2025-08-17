import type { Meta, StoryObj } from '@storybook/react';
import BadgeTag from '@atoms/product-detail/BadgeTag';
import { fn } from '@storybook/test';

const meta: Meta<typeof BadgeTag> = {
  title: 'Atoms/Product Detail/BadgeTag',
  component: BadgeTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onRemove: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Electronics',
  },
};

export const LongText: Story = {
  args: {
    text: 'Gaming Laptops and Accessories',
  },
};

export const ShortText: Story = {
  args: {
    text: 'Tech',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    text: 'Computers & Peripherals',
  },
};
