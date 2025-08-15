import { ProductTableRow } from '@atoms/products/ProductTableRow';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody } from '@shadcn/ui/table';

const meta: Meta<typeof ProductTableRow> = {
  title: 'Atoms/Products/ProductTableRow',
  component: ProductTableRow,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Table>
        <TableBody>
          <Story />
        </TableBody>
      </Table>
    ),
  ],
  argTypes: {
    isSelected: { control: 'boolean' },
    onSelect: { action: 'selected' },
    product: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductTableRow>;

const mockProduct = {
  id: '1',
  name: 'Phone',
  status: 'Active',
  inventory: 150,
  category: 'Electronics',
  cover: '/phone.webp',
  media: [
    {
      id: 'media_001',
      url: '/default.webp',
      position: 1,
      mediaType: 'IMAGE' as const,
    },
  ],
};

export const Default: Story = {
  args: {
    product: mockProduct,
    isSelected: false,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};

export const Selected: Story = {
  args: {
    product: mockProduct,
    isSelected: true,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};

export const LongName: Story = {
  args: {
    product: {
      ...mockProduct,
      name: 'Super Long Product Name That Might Wrap to Multiple Lines',
    },
    isSelected: false,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};
