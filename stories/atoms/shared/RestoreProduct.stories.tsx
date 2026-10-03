import { expect as storybookExpect, within } from 'storybook/test';
import RestoreProduct from '@atoms/shared/RestoreProduct';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof RestoreProduct> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Restore/ }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/RestoreProduct',
  component: RestoreProduct,
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
