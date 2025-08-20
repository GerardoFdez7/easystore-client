import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@shadcn/ui/sheet';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Sheet> = {
  title: 'Shadcn/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a description for the sheet component. You can put any
            content here.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">Sheet main content goes here.</div>
      </SheetContent>
    </Sheet>
  ),
};
