import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@shadcn/ui/dialog';

const meta: Meta<typeof Dialog> = {
  title: 'shadcn/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

const DialogExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md border px-4 py-2 text-sm">
          Open dialog
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This is a sample dialog using your shadcn wrapper.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <button className="rounded-md border px-4 py-2 text-sm">
              Cancel
            </button>
          </DialogClose>
          <button
            className="rounded-md border px-4 py-2 text-sm"
            onClick={() => setOpen(false)}
          >
            Continue
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const Basic: Story = { render: () => <DialogExample /> };
