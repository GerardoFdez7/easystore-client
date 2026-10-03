import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToggleGroup, ToggleGroupItem } from '@shadcn/ui/toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Shadcn/UI/ToggleGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: ToggleGroup,
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        I
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        U
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bold = canvas.getByRole('button', { name: 'Toggle bold' });
    await userEvent.click(bold);
    await storybookExpect(bold).toHaveAttribute('data-state', 'on');
  },
};
export const Single: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Left">
        L
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center">
        C
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">
        R
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const left = canvas.getByRole('radio', { name: 'Left' });
    await userEvent.click(left);
    await storybookExpect(left).toHaveAttribute('data-state', 'on');
  },
};
