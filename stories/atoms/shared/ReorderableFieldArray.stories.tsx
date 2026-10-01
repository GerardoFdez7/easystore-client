import type { Meta, StoryObj } from '@storybook/nextjs';
import ReorderableFieldArray from '@atoms/shared/ReorderableFieldArray';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

const items = [{ id: 'color' }, { id: 'capacity' }];
const labels = ['Color', 'Capacity'];
const values = ['Forest green', '750 ml'];
const translations: Record<string, string> = {
  moveUp: 'Move up',
  moveDown: 'Move down',
  delete: 'Delete',
};

const meta = {
  title: 'Atoms/Shared/ReorderableFieldArray',
  component: ReorderableFieldArray,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    items,
    onMove: () => undefined,
    onRemove: () => undefined,
    t: (key: string) => translations[key] ?? key,
    renderItem: (index: number) => (
      <div className="grid grid-cols-2 gap-3">
        <Label>{labels[index]}</Label>
        <Input value={values[index]} readOnly />
      </div>
    ),
  },
  argTypes: {
    items: {
      description: 'Field-array items with stable React Hook Form IDs.',
    },
    onMove: { control: false },
    onRemove: { control: false },
    renderItem: { control: false },
    t: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReorderableFieldArray>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
