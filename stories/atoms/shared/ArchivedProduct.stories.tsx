import ArchivedProduct from '@atoms/shared/ArchivedProduct';
import { MockedProvider } from '@apollo/client/testing/react';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ArchivedProduct> = {
  title: 'Atoms/Shared/ArchivedProduct',
  component: ArchivedProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]}>
        <div className="w-56">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
  argTypes: {
    productsIds: {
      control: 'object',
      description: 'Product IDs affected by the archive operation.',
    },
    isArchived: {
      control: 'object',
      description: 'Current archive state for single or bulk operations.',
    },
    singleMode: {
      control: 'boolean',
      description: 'Uses a single-product archive or restore action.',
    },
    onSoftDeleteComplete: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ArchivedProduct>;

export const SingleActiveProduct: Story = {
  args: {
    productsIds: ['product-1'],
    isArchived: false,
    singleMode: true,
  },
};

export const SingleArchivedProduct: Story = {
  args: {
    productsIds: ['product-1'],
    isArchived: true,
    singleMode: true,
  },
};

export const BulkSelection: Story = {
  args: {
    productsIds: ['product-1', 'product-2', 'product-3'],
    isArchived: [false, false, true],
  },
};
