import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AttributesCard from '@molecules/variant/AttributesCard';
import type { Attribute } from '@lib/utils/types/variant';

const meta: Meta<typeof AttributesCard> = {
  title: 'Molecules/Variant/AttributesCard',
  component: AttributesCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AttributesCard>;

const t = (k: string) =>
  (
    ({
      attributes: 'Attributes',
      addAttribute: 'Add Attribute',
      attributeKey: 'Key',
      attributeKeyPlaceholder: 'Enter key',
      attributeValue: 'Value',
      attributeValuePlaceholder: 'Enter value',
      noAttributesYet: 'No attributes yet.',
      moveUp: 'Move up',
      moveDown: 'Move down',
      delete: 'Delete',
    }) as Record<string, string>
  )[k] ?? k;

const Wrapper: React.FC = () => {
  const [attributes, setAttributes] = React.useState<Attribute[]>([
    { id: '1', key: '', value: '' },
  ]);

  return (
    <div className="w-[720px]">
      <AttributesCard
        t={t}
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </div>
  );
};

export const Default: Story = { render: () => <Wrapper /> };
