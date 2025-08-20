import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from '@shadcn/ui/checkbox';
import { Label } from '@shadcn/ui/label';

const meta: Meta<typeof Checkbox> = {
  title: 'Shadcn/Checkbox',
  parameters: {
    layout: 'centered',
  },
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  ),
};
