import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from '@shadcn/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'Shadcn/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Switch>;

function Demo(props: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="w-[720px]">
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={setChecked} {...props} />
        <span className="text-sm">{checked ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };

export const InitiallyOn: Story = {
  render: () => {
    const DemoOn = (props: React.ComponentProps<typeof Switch>) => {
      const [checked, setChecked] = React.useState(true);
      return (
        <div className="w-[720px]">
          <div className="flex items-center gap-3">
            <Switch checked={checked} onCheckedChange={setChecked} {...props} />
            <span className="text-sm">{checked ? 'On' : 'Off'}</span>
          </div>
        </div>
      );
    };
    return <DemoOn />;
  },
};

export const Disabled: Story = { render: () => <Demo disabled /> };
