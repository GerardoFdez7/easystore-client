import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
} from '@shadcn/ui/command';

const meta: Meta<typeof Command> = {
  title: 'Shadcn/UI/Command',
  tags: ['autodocs'],
  component: Command,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-105 p-6">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Command>;

const ITEMS = [
  { group: 'Fruits', items: ['Apple', 'Banana', 'Mango', 'Orange'] },
  { group: 'Vegetables', items: ['Carrot', 'Lettuce', 'Onion', 'Tomato'] },
];

const CommandInlineExample: React.FC = () => (
  <Command>
    <CommandInput placeholder="Search…" />
    <CommandList>
      <CommandEmpty>No results.</CommandEmpty>
      {ITEMS.map(({ group, items }) => (
        <CommandGroup key={group} heading={group}>
          {items.map((name) => (
            <CommandItem key={name} value={name}>
              {name}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </CommandList>
  </Command>
);

export const Inline: Story = {
  render: () => <CommandInlineExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('Search…'), 'mango');
    await storybookExpect(canvas.getByText('Mango')).toBeVisible();
    await storybookExpect(canvas.queryByText('Apple')).not.toBeInTheDocument();
  },
};

const CommandDialogExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-3">
      <button
        className="rounded-md border px-4 py-2 text-sm"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Open Command
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="General">
              <CommandItem onSelect={() => setOpen(false)}>
                New File
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Open…</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Save</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Edit">
              <CommandItem onSelect={() => setOpen(false)}>Cut</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Copy</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Paste</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export const InDialog: Story = {
  render: () => <CommandDialogExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open Command' });
    await userEvent.click(trigger);
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};
