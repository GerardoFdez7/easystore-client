import type { Meta, StoryObj } from '@storybook/react';
import Tags from '@molecules/product-detail/Tags';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Tags> = {
  title: 'Molecules/Product Detail/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    addTag: fn(),
    removeTag: fn(),
    setNewTag: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TagsWrapper = (args: any) => {
  const [tags, setTags] = useState<string[]>([
    'Electronics',
    'Gaming',
    'Computers',
  ]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-96">
      <Tags
        {...args}
        tags={tags}
        newTag={newTag}
        addTag={addTag}
        removeTag={removeTag}
        setNewTag={setNewTag}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <TagsWrapper {...args} />,
};
