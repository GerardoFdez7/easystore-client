import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from '@shadcn/ui/checkbox';
import { Label } from '@shadcn/ui/label';

const meta: Meta<typeof Checkbox> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByLabelText('Accept terms');
    await storybookExpect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await storybookExpect(checkbox).toBeChecked();
  },
  title: 'Shadcn/UI/Checkbox',
  tags: ['autodocs'],
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
