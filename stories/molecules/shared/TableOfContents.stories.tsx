import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: 'Table of contents' });
    const links = within(nav).getAllByRole('link');
    await storybookExpect(links).toHaveLength(8);
    await storybookExpect(links[1]).toHaveAttribute('href', '#values');
  },
};

export const WithActiveItem: Story = {
  args: {
    items: sampleItems,
    activeId: 'values',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('link', { name: '2. Our Values' }).closest('li'),
    ).toHaveClass('bg-hover');
    await storybookExpect(
      canvas.getByRole('link', { name: '1. Introduction' }).closest('li'),
    ).not.toHaveClass('bg-hover');
  },
};

export const CustomWidth: Story = {
  args: {
    items: sampleItems,
    activeId: 'why',
    className: 'w-96',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('navigation', { name: 'Table of contents' }),
    ).toHaveClass('w-96');
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
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('link')).toHaveLength(3);
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
            className={
              activeId === item.id
                ? 'bg-primary rounded px-3 py-1 text-sm text-white'
                : 'bg-border text-foreground hover:bg-hover rounded px-3 py-1 text-sm'
            }
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
  play: async ({ canvas }) => {
    const item = (label: string) =>
      canvas.getByRole('link', { name: label }).closest('li');
    await storybookExpect(item('1. Introduction')).toHaveClass('bg-hover');
    await userEvent.click(
      canvas.getByRole('button', { name: '3. Why We Collect' }),
    );
    await storybookExpect(item('3. Why We Collect')).toHaveClass('bg-hover');
    await storybookExpect(item('1. Introduction')).not.toHaveClass('bg-hover');
  },
};
