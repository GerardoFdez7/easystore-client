import { expect as storybookExpect, within } from 'storybook/test';
import DeleteProduct from '@atoms/shared/DeleteProduct';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof DeleteProduct> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Delete/ }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/DeleteProduct',
  component: DeleteProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={[]}>
        <div className="w-56">
          <Story />
        </div>
      </ApolloMswMocks>
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
