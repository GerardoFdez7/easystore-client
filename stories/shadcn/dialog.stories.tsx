import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Dialog> = {
  title: 'Shadcn/Dialog',
  parameters: {
    layout: 'centered',
  },
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment details</DialogTitle>
          <DialogDescription>
            Enter your billing information securely.
          </DialogDescription>
        </DialogHeader>
        <div>Dialog body goes here.</div>
      </DialogContent>
    </Dialog>
  ),
};
