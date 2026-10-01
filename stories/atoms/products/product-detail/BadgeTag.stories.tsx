import BadgeTag from '@atoms/products/product-detail/BadgeTag';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof BadgeTag> = {
  title: 'Atoms/Products/ProductDetail/BadgeTag',
  component: BadgeTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tag label displayed in the badge.',
    },
    onRemove: {
      control: false,
      description: 'Called when the remove button is activated.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BadgeTag>;

export const Default: Story = {
  args: {
    text: 'Eco-friendly',
    onRemove: () => {},
  },
};

export const LongLabel: Story = {
  args: {
    text: 'Made from responsibly sourced materials',
    onRemove: () => {},
  },
};
