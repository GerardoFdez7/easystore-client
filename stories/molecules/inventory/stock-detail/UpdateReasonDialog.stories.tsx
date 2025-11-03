import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import UpdateReasonDialog from '@molecules/inventory/stock-detail/UpdateReasonDialog';

const Wrapper = () => {
  const [open, setOpen] = useState(true);
  return (
    <UpdateReasonDialog
      open={open}
      onOpenChange={setOpen}
      onConfirm={() => setOpen(false)}
    />
  );
};

const meta: Meta<typeof Wrapper> = {
  title: 'Molecules/Inventory/Detail/UpdateReasonDialog',
  component: Wrapper,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {};
