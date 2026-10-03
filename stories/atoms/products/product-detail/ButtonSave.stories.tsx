import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonSave from '@atoms/products/product-detail/ButtonSave';

const meta: Meta<typeof ButtonSave> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Save Changes' }),
    ).toHaveAttribute('type', 'submit');
  },
  title: 'Atoms/Products/Product Detail/ButtonSave',
  component: ButtonSave,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
