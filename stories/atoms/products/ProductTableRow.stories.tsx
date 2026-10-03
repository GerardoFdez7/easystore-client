import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import { ProductTableRow } from '@atoms/products/ProductTableRow';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MediaTypeEnum, TypeEnum } from '@graphql/generated';
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
  args: { onSelect: fn() },
  argTypes: {
    isSelected: { control: 'boolean' },
    onSelect: { control: false },
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
      mediaType: MediaTypeEnum.Image,
    },
  ],
  isArchived: false,
  productType: TypeEnum.Physical,
  shortDescription: 'A modern smartphone.',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T12:30:00Z',
};

export const Default: Story = {
  args: {
    product: mockProduct,
    isSelected: false,
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
    await storybookExpect(canvas.getByText('Phone')).toBeVisible();
    const checkbox = canvas.getByRole('checkbox', { name: 'Select Phone' });
    await storybookExpect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await storybookExpect(args.onSelect).toHaveBeenCalledWith(true);
  },
};

export const Selected: Story = {
  args: {
    product: mockProduct,
    isSelected: true,
  },
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Select Phone' });
    await storybookExpect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await storybookExpect(args.onSelect).toHaveBeenCalledWith(false);
  },
};

export const LongName: Story = {
  args: {
    product: {
      ...mockProduct,
      name: 'Super Long Product Name That Might Wrap to Multiple Lines',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T12:30:00Z',
    },
    isSelected: false,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText(
        'Super Long Product Name That Might Wrap to Multiple Lines',
      ),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByRole('checkbox', {
        name: 'Select Super Long Product Name That Might Wrap to Multiple Lines',
      }),
    ).not.toBeChecked();
  },
};
