import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { StoryContext } from '@storybook/nextjs-vite';
import ArchivedProduct from '@atoms/shared/ArchivedProduct';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ArchivedProduct> = {
  title: 'Atoms/Shared/ArchivedProduct',
  component: ArchivedProduct,
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

// The alert dialog renders in a portal outside the canvas, so query via `screen`.
const openAndCancel =
  (triggerName: string, confirmName: string) =>
  async ({ canvas }: Pick<StoryContext, 'canvas'>) => {
    await userEvent.click(canvas.getByRole('button', { name: triggerName }));
    const dialog = await screen.findByRole('alertdialog', {
      name: triggerName,
    });
    await waitFor(() => storybookExpect(dialog).toBeVisible());
    await storybookExpect(
      screen.getByRole('button', { name: confirmName }),
    ).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      storybookExpect(
        screen.queryByRole('alertdialog'),
      ).not.toBeInTheDocument(),
    );
  };

export const SingleActiveProduct: Story = {
  args: {
    productsIds: ['product-1'],
    isArchived: false,
    singleMode: true,
  },
  play: async (context) => {
    await openAndCancel('Archive Product', 'Archive')(context);
    await storybookExpect(
      context.canvas.getByRole('button', { name: 'Archive Product' }),
    ).toHaveAttribute('aria-expanded', 'false');
  },
};

export const SingleArchivedProduct: Story = {
  args: {
    productsIds: ['product-1'],
    isArchived: true,
    singleMode: true,
  },
  play: async (context) => {
    await openAndCancel('Restore Product', 'Restore')(context);
    await storybookExpect(
      context.canvas.getByRole('button', { name: 'Restore Product' }),
    ).toHaveAttribute('aria-expanded', 'false');
  },
};

export const BulkSelection: Story = {
  args: {
    productsIds: ['product-1', 'product-2', 'product-3'],
    isArchived: [false, false, true],
  },
  play: async (context) => {
    await openAndCancel('Archive Products', 'Archive (3)')(context);
    await storybookExpect(
      context.canvas.getByRole('button', { name: 'Archive Products' }),
    ).toHaveAttribute('aria-expanded', 'false');
  },
};
