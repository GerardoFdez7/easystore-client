import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open dialog' });
    await storybookExpect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
  title: 'Shadcn/UI/Dialog',
  tags: ['autodocs'],
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
