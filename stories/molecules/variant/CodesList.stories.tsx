import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CodesList from '@molecules/variant/CodesList';

const meta: Meta<typeof CodesList> = {
  title: 'Molecules/Variant/CodesList',
  component: CodesList,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof CodesList>;

const t = (k: string) =>
  (
    ({
      sku: 'SKU',
      skuPlaceholder: 'Enter SKU',
      upc: 'UPC',
      upcPlaceholder: 'Enter UPC',
      ean: 'EAN',
      eanPlaceholder: 'Enter EAN',
      isbn: 'ISBN',
      isbnPlaceholder: 'Enter ISBN',
    }) as Record<string, string>
  )[k] ?? k;

export const Default: Story = {
  render: () => (
    <div className="w-[720px]">
      <CodesList t={t} />
    </div>
  ),
};
