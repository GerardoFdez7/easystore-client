import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PersonalizationList from '@molecules/variant/PersonalizationList';

const meta: Meta<typeof PersonalizationList> = {
  title: 'Molecules/Variant/PersonalizationList',
  component: PersonalizationList,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof PersonalizationList>;

const t = (k: string) =>
  (
    ({
      personalizationOptions: 'Personalization options',
      addPersonalization: 'Add personalization',
      noPersonalizations: 'No personalization options yet',
      personalizationPlaceholder: 'e.g., Engraving: Ana',
      delete: 'Delete',
    }) as Record<string, string>
  )[k] ?? k;

function Demo() {
  const [options, setOptions] = React.useState<string[]>([]);
  return (
    <div className="w-[720px]">
      <PersonalizationList t={t} options={options} setOptions={setOptions} />
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
