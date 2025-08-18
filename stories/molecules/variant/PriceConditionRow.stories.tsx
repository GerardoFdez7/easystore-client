import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PriceConditionRow from '@molecules/variant/PriceConditionRow';
import type { Condition } from '@lib/utils/types/variant';

const meta: Meta<typeof PriceConditionRow> = {
  title: 'Molecules/Variant/PriceConditionRow',
  component: PriceConditionRow,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof PriceConditionRow>;

const t = (k: string) =>
  (
    ({
      price: 'Price',
      pricePlaceholder: '0.00',
      condition: 'Condition',
      selectCondition: 'Select condition',
      conditionNew: 'New',
      conditionUsed: 'Used',
      conditionRefurbished: 'Refurbished',
    }) as Record<string, string>
  )[k] ?? k;

const Wrapper: React.FC = () => {
  const [condition, setCondition] = React.useState<Condition>('NEW');
  const [price, setPrice] = React.useState<string>('');

  return (
    <div className="w-[720px]">
      <PriceConditionRow
        t={t}
        condition={condition}
        setCondition={setCondition}
        price={price}
        setPrice={setPrice}
      />
    </div>
  );
};

export const Default: Story = { render: () => <Wrapper /> };
