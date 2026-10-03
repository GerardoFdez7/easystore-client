import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import BadgeTag from '@atoms/products/product-detail/BadgeTag';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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
    onRemove: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByText('Eco-friendly')).toBeVisible();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Eco-friendly' }),
    );
    await storybookExpect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};

export const LongLabel: Story = {
  args: {
    text: 'Made from responsibly sourced materials',
    onRemove: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByText('Made from responsibly sourced materials'),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Remove Made from responsibly sourced materials',
      }),
    );
    await storybookExpect(args.onRemove).toHaveBeenCalledTimes(1);
  },
};
