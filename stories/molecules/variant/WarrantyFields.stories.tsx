import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import WarrantyFields, { Warranty } from '@molecules/variant/WarrantyFields';

const meta: Meta<typeof WarrantyFields> = {
  title: 'Molecules/Variant/WarrantyFields',
  component: WarrantyFields,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof WarrantyFields>;

const t = (k: string) =>
  (
    ({
      warranties: 'Warranties',
      warrantyMonths: 'Warranty months',
      warrantyMonthsPlaceholder: 'e.g., 12',
      warrantyCoverage: 'Coverage',
      warrantyCoveragePlaceholder: 'e.g., Covers manufacturing defects',
      warrantyInstructions: 'Instructions',
      warrantyInstructionsPlaceholder:
        'e.g., Keep receipt; contact support for RMA',
    }) as Record<string, string>
  )[k] ?? k;

function Demo() {
  const [warranty, setWarranty] = React.useState<Warranty>({
    months: '',
    coverage: '',
    instructions: '',
  });
  return (
    <div className="w-[720px]">
      <WarrantyFields t={t} warranty={warranty} setWarranty={setWarranty} />
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
