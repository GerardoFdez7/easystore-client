import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import ArrayItemBox from '@atoms/shared/ArrayItemBox';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

const meta: Meta<typeof ArrayItemBox> = {
  title: 'Atoms/Shared/ArrayItemBox',
  component: ArrayItemBox,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof ArrayItemBox>;

const t = (k: string) =>
  (
    ({
      moveUp: 'Move up',
      moveDown: 'Move down',
      delete: 'Delete',
    }) as Record<string, string>
  )[k] ?? k;

const SimpleContent: React.FC = () => (
  <div className="space-y-2">
    <p className="text-sm">This is a simple content example</p>
    <p className="text-muted-foreground text-xs">
      You can put any content inside the ArrayItemBox
    </p>
  </div>
);

const FormContent: React.FC = () => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    <div>
      <Label className="text-xs">Key</Label>
      <Input placeholder="Enter key" defaultValue="Color" />
    </div>
    <div>
      <Label className="text-xs">Value</Label>
      <Input placeholder="Enter value" defaultValue="Red" />
    </div>
  </div>
);

export const Default: Story = {
  args: {
    index: 0,
    canMoveUp: false,
    canMoveDown: true,
    onMoveUp: () => console.log('Move up'),
    onMoveDown: () => console.log('Move down'),
    onDelete: () => console.log('Delete'),
    t,
    children: <SimpleContent />,
  },
};

export const WithFormInputs: Story = {
  args: {
    index: 1,
    canMoveUp: true,
    canMoveDown: true,
    onMoveUp: () => console.log('Move up'),
    onMoveDown: () => console.log('Move down'),
    onDelete: () => console.log('Delete'),
    t,
    children: <FormContent />,
  },
};

export const FirstItem: Story = {
  args: {
    index: 0,
    canMoveUp: false,
    canMoveDown: true,
    onMoveUp: () => console.log('Move up'),
    onMoveDown: () => console.log('Move down'),
    onDelete: () => console.log('Delete'),
    t,
    children: <FormContent />,
  },
};

export const LastItem: Story = {
  args: {
    index: 2,
    canMoveUp: true,
    canMoveDown: false,
    onMoveUp: () => console.log('Move up'),
    onMoveDown: () => console.log('Move down'),
    onDelete: () => console.log('Delete'),
    t,
    children: <FormContent />,
  },
};

export const SingleItem: Story = {
  args: {
    index: 0,
    canMoveUp: false,
    canMoveDown: false,
    onMoveUp: () => console.log('Move up'),
    onMoveDown: () => console.log('Move down'),
    onDelete: () => console.log('Delete'),
    t,
    children: <FormContent />,
  },
};
