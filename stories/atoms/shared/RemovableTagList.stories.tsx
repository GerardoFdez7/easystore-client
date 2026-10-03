import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import RemovableTagList from '@atoms/shared/RemovableTagList';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

type DemoTag = {
  id: string;
  label: string;
};

const DemoRemovableTagList = RemovableTagList<DemoTag>;

const demoTags: DemoTag[] = [
  { id: 'tag-organic', label: 'Organic' },
  { id: 'tag-local', label: 'Locally made' },
  { id: 'tag-recycled', label: 'Recycled materials' },
];

const meta: Meta<typeof DemoRemovableTagList> = {
  title: 'Atoms/Shared/RemovableTagList',
  component: DemoRemovableTagList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Items rendered as removable tags.',
    },
    getKey: { control: false },
    getLabel: { control: false },
    getDeleteAriaLabel: { control: false },
    onRemove: {
      control: false,
      description: 'Called with the removed item index.',
    },
    tagClassName: {
      control: 'text',
      description: 'Classes applied to each tag container.',
    },
  },
  args: {
    getKey: (item) => item.id,
    getLabel: (item) => item.label,
    getDeleteAriaLabel: (item) => `Remove ${item.label}`,
    onRemove: fn(),
    tagClassName:
      'bg-muted/50 flex items-center gap-1 rounded-md border px-3 py-1',
  },
};

export default meta;

type Story = StoryObj<typeof DemoRemovableTagList>;

export const Populated: Story = {
  args: {
    items: demoTags,
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByText('Organic')).toBeVisible();
    await storybookExpect(canvas.getAllByRole('button')).toHaveLength(3);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Locally made' }),
    );
    await storybookExpect(args.onRemove).toHaveBeenCalledWith(1);
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
  play: async ({ canvas, canvasElement }) => {
    await storybookExpect(
      canvasElement.querySelector('div'),
    ).toBeEmptyDOMElement();
    await storybookExpect(canvas.queryByRole('button')).not.toBeInTheDocument();
    await storybookExpect(
      canvas.queryByText('Organic'),
    ).not.toBeInTheDocument();
  },
};
