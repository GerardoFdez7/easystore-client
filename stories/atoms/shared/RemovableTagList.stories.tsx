import RemovableTagList from '@atoms/shared/RemovableTagList';
import type { Meta, StoryObj } from '@storybook/nextjs';

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
    onRemove: () => {},
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
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
