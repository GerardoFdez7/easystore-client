import {
  expect as storybookExpect,
  screen,
  userEvent,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip, TooltipTrigger, TooltipContent } from '@shadcn/ui/tooltip';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Tooltip> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: 'Hover me' }));
    await storybookExpect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Tooltip content goes here!',
    );
  },
  title: 'Shadcn/UI/Tooltip',
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
