import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from '@shadcn/ui/label';
import { Input } from '@shadcn/ui/input';

const meta: Meta<typeof Label> = {
  title: 'Shadcn/Label',
  parameters: {
    layout: 'centered',
  },
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  ),
};
