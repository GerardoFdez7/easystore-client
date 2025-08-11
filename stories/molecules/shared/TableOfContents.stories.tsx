import type { Meta, StoryObj } from '@storybook/nextjs';
import { TableOfContents } from '@molecules/shared/TableOfContents';
import { useState } from 'react';

const meta: Meta<typeof TableOfContents> = {
  title: 'Molecules/Shared/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of navigation items with id and label',
    },
    activeId: {
      control: 'text',
      description: 'ID of the currently active item',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

const sampleItems = [
  { id: 'intro', label: '1. Introduction' },
  { id: 'values', label: '2. Our Values' },
  { id: 'why', label: '3. Why We Collect' },
  { id: 'where', label: '4. Where We Store' },
  { id: 'howLong', label: '5. How Long We Keep' },
  { id: 'protect', label: '6. How We Protect' },
  { id: 'cookies', label: '7. Cookies' },
  { id: 'contact', label: '8. Contact Us' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    activeId: '',
  },
};

export const WithActiveItem: Story = {
  args: {
    items: sampleItems,
    activeId: 'values',
  },
};

export const CustomWidth: Story = {
  args: {
    items: sampleItems,
    activeId: 'why',
    className: 'w-96',
  },
};

export const FewItems: Story = {
  args: {
    items: [
      { id: 'section1', label: '1. First Section' },
      { id: 'section2', label: '2. Second Section' },
      { id: 'section3', label: '3. Third Section' },
    ],
    activeId: 'section2',
  },
};

function InteractiveTableOfContents() {
  const [activeId, setActiveId] = useState('intro');

  return (
    <div className="space-y-4">
      <TableOfContents items={sampleItems} activeId={activeId} />
      <div className="flex flex-wrap gap-2">
        {sampleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`rounded px-3 py-1 text-sm ${
              activeId === item.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveTableOfContents />,
};
