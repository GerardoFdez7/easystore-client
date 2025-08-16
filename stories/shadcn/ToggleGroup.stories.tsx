import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from '@shadcn/ui/toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Shadcn/ToggleGroup',
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
};
