import type { Meta, StoryObj } from '@storybook/nextjs';
import { SearchIcon } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { VisuallyHidden } from '@shadcn/ui/visually-hidden';

const meta = {
  title: 'Shadcn/UI/VisuallyHidden',
  component: VisuallyHidden,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Search products' },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AccessibleIconButton: Story = {
  render: () => (
    <Button size="icon" variant="outline">
      <SearchIcon data-icon="inline-start" aria-hidden />
      <VisuallyHidden>Search products</VisuallyHidden>
    </Button>
  ),
};
