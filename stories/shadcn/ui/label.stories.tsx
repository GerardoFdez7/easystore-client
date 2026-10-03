import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from '@shadcn/ui/label';
import { Input } from '@shadcn/ui/input';

const meta: Meta<typeof Label> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByLabelText('Name')).toHaveAttribute(
      'placeholder',
      'John Doe',
    );
  },
  title: 'Shadcn/UI/Label',
  tags: ['autodocs'],
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
