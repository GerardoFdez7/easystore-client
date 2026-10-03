import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UpdateReasonDialog from '@molecules/inventory/stock-detail/UpdateReasonDialog';

const Wrapper = ({ onConfirm }: { onConfirm: () => void }) => {
  const [open, setOpen] = useState(true);
  const form = useForm({ defaultValues: { reason: '' } });

  return (
    <FormProvider {...form}>
      <UpdateReasonDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          onConfirm();
          setOpen(false);
        }}
      />
    </FormProvider>
  );
};

const meta: Meta<typeof Wrapper> = {
  title: 'Molecules/Inventory/Detail/UpdateReasonDialog',
  component: Wrapper,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {
  args: { onConfirm: fn() },
  play: async ({ args }) => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Update Reason');
    const confirm = screen.getByRole('button', { name: 'Confirm' });
    await storybookExpect(confirm).toBeDisabled();

    const reason = screen.getByRole('textbox');
    await userEvent.type(reason, 'too short');
    await storybookExpect(confirm).toBeDisabled();

    await userEvent.type(reason, ' - now the reason is long enough');
    await storybookExpect(confirm).toBeEnabled();
    await userEvent.click(confirm);
    await waitFor(() =>
      storybookExpect(args.onConfirm).toHaveBeenCalledTimes(1),
    );
    await waitFor(() =>
      storybookExpect(screen.queryByRole('dialog')).toBeNull(),
    );
  },
};

export const Cancel: Story = {
  args: { onConfirm: fn() },
  play: async ({ args }) => {
    await screen.findByRole('dialog');
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      storybookExpect(screen.queryByRole('dialog')).toBeNull(),
    );
    await storybookExpect(args.onConfirm).not.toHaveBeenCalled();
  },
};
