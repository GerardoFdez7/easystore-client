import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DimensionsRow from '@molecules/variant/DimensionRow';

const meta: Meta<typeof DimensionsRow> = {
  title: 'Molecules/Variant/DimensionsRow',
  component: DimensionsRow,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof DimensionsRow>;

const t = (k: string) =>
  (
    ({
      dimension: 'Dimensions',
      height: 'Height',
      heightPlaceholder: 'height',
      width: 'Width',
      widthPlaceholder: 'width',
      length: 'Length',
      lengthPlaceholder: 'length',
    }) as Record<string, string>
  )[k] ?? k;

export const Default: Story = {
  render: () => (
    <div className="w-[720px]">
      <DimensionsRow t={t} />
    </div>
  ),
};
