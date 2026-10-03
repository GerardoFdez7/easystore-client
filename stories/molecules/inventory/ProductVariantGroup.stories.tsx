import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductVariantGroup from '@molecules/inventory/ProductVariantGroup';

const meta: Meta<typeof ProductVariantGroup> = {
  title: 'Molecules/Inventory/ProductVariantGroup',
  component: ProductVariantGroup,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-200">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductVariantGroup>;

const mockVariants = [
  {
    id: '1',
    sku: 'TSHIRT-RED-M',
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'Medium' },
    ],
  },
  {
    id: '2',
    sku: 'TSHIRT-RED-L',
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'Large' },
    ],
  },
  {
    id: '3',
    sku: 'TSHIRT-BLUE-M',
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Size', value: 'Medium' },
    ],
  },
];

export const Default: Story = {
  args: {
    productName: 'Classic T-Shirt',
    variants: mockVariants.map((variant) => ({
      ...variant,
      attributes: variant.attributes.map((attr) => ({
        key: attr.name,
        value: attr.value,
      })),
    })),
    onVariantSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByText('Classic T-Shirt'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getByText('3 variants')).toBeInTheDocument();
    await storybookExpect(
      canvas.getAllByRole('button', { name: /Select/ }),
    ).toHaveLength(3);
    await storybookExpect(
      canvas.getByText('Color: Red, Size: Large'),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getAllByRole('button', { name: /Select/ })[1]);
    await storybookExpect(args.onVariantSelect).toHaveBeenCalledWith(
      '2',
      'TSHIRT-RED-L',
      'Classic T-Shirt',
      [
        { key: 'Color', value: 'Red' },
        { key: 'Size', value: 'Large' },
      ],
    );
  },
};

export const WithSelectedVariant: Story = {
  args: {
    productName: 'Classic T-Shirt',
    variants: mockVariants.map((variant) => ({
      ...variant,
      attributes: variant.attributes.map((attr) => ({
        key: attr.name,
        value: attr.value,
      })),
    })),
    selectedVariantId: '2',
    onVariantSelect: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Selected' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getAllByRole('button', { name: /^Select$/ }),
    ).toHaveLength(2);
  },
};

export const SingleVariant: Story = {
  args: {
    productName: 'Simple Product',
    variants: [
      {
        id: '1',
        sku: 'SIMPLE-001',
        attributes: [{ key: 'Type', value: 'Standard' }],
      },
    ],
    onVariantSelect: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('Simple Product'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getByText('1 variant')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('SKU: SIMPLE-001'),
    ).toBeInTheDocument();
  },
};

export const VariantWithoutSku: Story = {
  args: {
    productName: 'Product Without SKU',
    variants: [
      {
        id: '1',
        sku: '',
        attributes: [
          { key: 'Color', value: 'Green' },
          { key: 'Material', value: 'Cotton' },
        ],
      },
    ],
    onVariantSelect: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('Color: Green, Material: Cotton'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText(/SKU:/)).toBeNull();
  },
};

export const ManyVariants: Story = {
  args: {
    productName: 'Multi-Variant Product',
    variants: [
      ...mockVariants.map((variant) => ({
        ...variant,
        attributes: variant.attributes.map((attr) => ({
          key: attr.name,
          value: attr.value,
        })),
      })),
      {
        id: '4',
        sku: 'TSHIRT-GREEN-S',
        attributes: [
          { key: 'Color', value: 'Green' },
          { key: 'Material', value: 'Cotton' },
        ],
      },
      {
        id: '5',
        sku: 'TSHIRT-GREEN-XL',
        attributes: [
          { key: 'Color', value: 'Green' },
          { key: 'Size', value: 'Extra Large' },
        ],
      },
    ],
    onVariantSelect: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByText('5 variants')).toBeInTheDocument();
    await storybookExpect(
      canvas.getAllByRole('button', { name: /Select/ }),
    ).toHaveLength(5);
  },
};

export const ManyAttributes: Story = {
  args: {
    productName: 'Product with Many Attributes',
    variants: [
      {
        id: '1',
        sku: 'ATTR-PROD-123',
        attributes: [
          { key: 'Color', value: 'Red' },
          { key: 'Size', value: 'Medium' },
          { key: 'Material', value: 'Cotton' },
          { key: 'Pattern', value: 'Striped' },
          { key: 'Sleeve', value: 'Short' },
          { key: 'Neckline', value: 'Crew' },
          { key: 'Fit', value: 'Regular' },
          { key: 'Season', value: 'Summer' },
          { key: 'Collection', value: '2024' },
          { key: 'Style', value: 'Casual' },
          { key: 'Occasion', value: 'Everyday' },
          { key: 'Brand', value: 'EasyStore' },
          { key: 'Weight', value: 'Light' },
          { key: 'Origin', value: 'USA' },
          { key: 'Care', value: 'Machine Wash' },
        ],
      },
    ],
    onVariantSelect: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByText(/Fit: Regular/)).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('SKU: ATTR-PROD-123'),
    ).toBeInTheDocument();
  },
};
