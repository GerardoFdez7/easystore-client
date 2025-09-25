import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductVariantGroup from '@molecules/inventory/ProductVariantGroup';

const meta: Meta<typeof ProductVariantGroup> = {
  title: 'Molecules/Inventory/ProductVariantGroup',
  component: ProductVariantGroup,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 800 }}>
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
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
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
  },
};
