import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DeleteProduct from '@atoms/products/product-detail/DeleteProduct';

const meta: Meta<typeof DeleteProduct> = {
  title: 'Atoms/Products/Product Detail/DeleteProduct',
  component: DeleteProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Delete' });
    await userEvent.click(trigger);
    // The alert dialog renders in a portal outside the canvas.
    const dialog = await screen.findByRole('alertdialog', {
      name: 'Delete product?',
    });
    await waitFor(() => storybookExpect(dialog).toBeVisible());
    await storybookExpect(
      screen.getByRole('button', { name: 'Delete' }),
    ).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      storybookExpect(
        screen.queryByRole('alertdialog'),
      ).not.toBeInTheDocument(),
    );
  },
};
