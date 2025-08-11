import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip, TooltipTrigger, TooltipContent } from '@shadcn/ui/tooltip';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Tooltip> = {
  title: 'Shadcn/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip content goes here!</TooltipContent>
    </Tooltip>
  ),
};
