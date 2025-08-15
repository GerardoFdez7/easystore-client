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
      attributeKey: 'KEY',
      attributeValue: 'VALUE',
      removeAttribute: 'Remove attribute',
      notes: 'Notes',
    }) as Record<string, string>
  )[k] ?? k;

const Wrapper: React.FC = () => {
  const [attributes, setAttributes] = React.useState<Attribute[]>([
    { id: '1', key: '', value: '' },
  ]);
  const [notes, setNotes] = React.useState('');
  return (
    <div className="w-[720px]">
      <AttributesCard
        t={t}
        attributes={attributes}
        setAttributes={setAttributes}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
};

export const Default: Story = { render: () => <Wrapper /> };
