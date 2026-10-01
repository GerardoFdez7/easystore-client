import DeleteProduct from '@atoms/shared/DeleteProduct';
import { MockedProvider } from '@apollo/client/testing/react';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof DeleteProduct> = {
  title: 'Atoms/Shared/DeleteProduct',
  component: DeleteProduct,
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
    productIds: {
      control: 'object',
      description: 'Product IDs permanently deleted after confirmation.',
    },
    singleMode: {
      control: 'boolean',
      description: 'Uses singular dialog labels and deletion behavior.',
    },
    onDeleteComplete: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DeleteProduct>;

export const SingleProduct: Story = {
  args: {
    productIds: ['product-1'],
    singleMode: true,
  },
};

export const MultipleProducts: Story = {
  args: {
    productIds: ['product-1', 'product-2', 'product-3'],
  },
};
