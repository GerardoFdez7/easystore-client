import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainVariant from '@organisms/products/variant/MainVariant';
import { ProductCreationProvider } from '@contexts/ProductCreationContext';
import { ProductsProvider } from '@contexts/ProductsContext';

const MockMainVariant = () => {
  return (
    <ProductsProvider>
      <ProductCreationProvider>
        <MainVariant productId="123" isNew={true} />
      </ProductCreationProvider>
    </ProductsProvider>
  );
};

const meta: Meta<typeof MainVariant> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Add' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Products/Variant/MainVariant',
  component: MockMainVariant,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainVariant>;

export const Default: Story = {};
