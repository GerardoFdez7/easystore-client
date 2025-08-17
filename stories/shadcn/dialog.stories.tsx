import type { Meta, StoryObj } from '@storybook/react';
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
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Dialog> = {
  title: 'Shadcn/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Dialog component is a styled implementation of shadcn`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic example of dialog content.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog (no close button)</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Dialog without close button</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog (long content)</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Long Content Example</DialogTitle>
          <DialogDescription>
            This example shows how the dialog behaves with lots of content.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] space-y-2 overflow-y-auto text-sm">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>This is a sample paragraph #{i + 1}</p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
