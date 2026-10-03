import {
  expect as storybookExpect,
  screen,
  userEvent,
  within,
} from 'storybook/test';
// Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@shadcn/ui/popover';

type Align = 'start' | 'center' | 'end';

type PlaygroundProps = {
  align?: Align;
  sideOffset?: number;
};

const PopoverPlayground: React.FC<PlaygroundProps> = ({
  align = 'center',
  sideOffset = 4,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="rounded-md border px-4 py-2 text-sm">
        Open popover
      </button>
    </PopoverTrigger>
    <PopoverContent align={align} sideOffset={sideOffset} aria-label="Greeting">
      <div className="space-y-1">
        <p className="text-sm font-medium">Hello 👋</p>
        <p className="text-muted-foreground text-xs">
          Try changing <code>align</code> and <code>sideOffset</code> from
          controls.
        </p>
      </div>
    </PopoverContent>
  </Popover>
);

// ✅ tipa el Meta contra el wrapper para que `align` y `sideOffset` sean válidos
const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
    await storybookExpect(
      await screen.findByRole('dialog', { name: 'Greeting' }),
    ).toHaveTextContent('Hello 👋');
  },
  title: 'Shadcn/UI/Popover',
  tags: ['autodocs'],
  component: PopoverPlayground,
  parameters: { layout: 'centered' },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
    },
    sideOffset: { control: 'number' },
  },
} satisfies Meta<typeof PopoverPlayground>;

export default meta;

type Story = StoryObj<typeof PopoverPlayground>;

export const Basic: Story = {
  args: { align: 'center', sideOffset: 4 },
};

export const EndWithOffset: Story = {
  args: { align: 'end', sideOffset: 12 },
};
