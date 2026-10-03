import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonCancel from '@atoms/products/product-detail/ButtonCancel';

const meta: Meta<typeof ButtonCancel> = {
  title: 'Atoms/Products/Product Detail/ButtonCancel',
  component: ButtonCancel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(trigger);
    // The alert dialog renders in a portal outside the canvas.
    const dialog = await screen.findByRole('alertdialog', {
      name: 'Discard Changes',
    });
    await waitFor(() => storybookExpect(dialog).toBeVisible());
    await storybookExpect(
      screen.getByRole('button', { name: 'Discard Changes' }),
    ).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      storybookExpect(
        screen.queryByRole('alertdialog'),
      ).not.toBeInTheDocument(),
    );
  },
};
