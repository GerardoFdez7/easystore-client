import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import UpdateReasonDialog from '@molecules/stock-detail/UpdateReasonDialog';

const Wrapper = () => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('');
  return (
    <UpdateReasonDialog
      open={open}
      onOpenChange={setOpen}
      value={value}
      onChange={setValue}
      onConfirm={() => setOpen(false)}
      minLength={10}
    />
  );
};

const meta: Meta<typeof Wrapper> = {
  title: 'Molecules/StockDetail/UpdateReasonDialog',
  component: Wrapper,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {};
