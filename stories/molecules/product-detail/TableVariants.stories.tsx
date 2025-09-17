import type { Meta, StoryObj } from '@storybook/react';
import TableVariants from '@molecules/product-detail/TableVariants';

const meta: Meta<typeof TableVariants> = {
  title: 'Molecules/Product Detail/TableVariants',
  component: TableVariants,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <TableVariants variants={[]} />
    </div>
  ),
};
