import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ArchivedProduct from '@atoms/products/product-detail/ArchivedProduct';

const meta: Meta<typeof ArchivedProduct> = {
  title: 'Atoms/Products/Product Detail/ArchivedProduct',
  component: ArchivedProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Archive Product' });
    await userEvent.click(trigger);
    // The alert dialog renders in a portal outside the canvas.
    const dialog = await screen.findByRole('alertdialog', {
      name: 'Archive product?',
    });
    await waitFor(() => storybookExpect(dialog).toBeVisible());
    await storybookExpect(
      screen.getByRole('button', { name: 'Archive' }),
    ).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      storybookExpect(
        screen.queryByRole('alertdialog'),
      ).not.toBeInTheDocument(),
    );
  },
};
