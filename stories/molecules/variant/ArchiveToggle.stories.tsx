import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ArchiveToggle from '@molecules/variant/ArchiveToggle';

const meta: Meta<typeof ArchiveToggle> = {
  title: 'Molecules/Variant/ArchiveToggle',
  component: ArchiveToggle,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof ArchiveToggle>;

const t = (k: string) =>
  (({ isArchived: 'Archived' }) as Record<string, string>)[k] ?? k;

function Demo() {
  const [isArchived, setIsArchived] = React.useState(false);
  return (
    <div className="w-[720px]">
      <ArchiveToggle
        t={t}
        isArchived={isArchived}
        setIsArchived={setIsArchived}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
