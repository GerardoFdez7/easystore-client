import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    onMove: fn(),
    onRemove: fn(),
    t: (key: string) => translations[key] ?? key,
    renderItem: (index: number) => (
      <div className="grid grid-cols-2 gap-3">
        <Label htmlFor={`field-${items[index].id}`}>{labels[index]}</Label>
        <Input id={`field-${items[index].id}`} value={values[index]} readOnly />
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

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByLabelText('Color')).toHaveValue(
      'Forest green',
    );
    await storybookExpect(canvas.getByLabelText('Capacity')).toHaveValue(
      '750 ml',
    );
    const moveUp = canvas.getAllByRole('button', { name: 'Move up' });
    const moveDown = canvas.getAllByRole('button', { name: 'Move down' });
    await storybookExpect(moveUp[0]).toBeDisabled();
    await storybookExpect(moveDown[1]).toBeDisabled();
    await userEvent.click(moveDown[0]);
    await storybookExpect(args.onMove).toHaveBeenCalledWith(0, 'down');
    await userEvent.click(moveUp[1]);
    await storybookExpect(args.onMove).toHaveBeenCalledWith(1, 'up');
    const remove = canvas.getAllByRole('button', { name: 'Delete' });
    await storybookExpect(remove).toHaveLength(items.length);
    await userEvent.click(remove[1]);
    await storybookExpect(args.onRemove).toHaveBeenCalledWith(1);
  },
};
