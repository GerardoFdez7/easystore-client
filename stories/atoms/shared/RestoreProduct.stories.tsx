import RestoreProduct from '@atoms/shared/RestoreProduct';
import { MockedProvider } from '@apollo/client/testing/react';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof RestoreProduct> = {
  title: 'Atoms/Shared/RestoreProduct',
  component: RestoreProduct,
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
      description: 'Archived product IDs restored after confirmation.',
    },
    isArchived: {
      control: 'object',
      description: 'Archive state paired with the selected product IDs.',
    },
    onRestoreComplete: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof RestoreProduct>;

export const SingleProduct: Story = {
  args: {
    productsIds: ['product-1'],
    isArchived: true,
  },
};

export const MultipleProducts: Story = {
  args: {
    productsIds: ['product-1', 'product-2'],
    isArchived: [true, true],
  },
};
