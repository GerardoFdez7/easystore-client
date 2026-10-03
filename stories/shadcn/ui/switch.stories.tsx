import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Switch } from '@shadcn/ui/switch';

const meta: Meta<typeof Switch> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('switch')).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Switch',
  tags: ['autodocs'],
  component: Switch,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Switch>;

function Demo(props: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="w-180">
      <div className="flex items-center gap-3">
        <Switch
          aria-label="Notifications"
          checked={checked}
          onCheckedChange={setChecked}
          {...props}
        />
        <span className="text-sm">{checked ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: 'Notifications' });
    await storybookExpect(toggle).toHaveAttribute('aria-checked', 'false');
    await storybookExpect(canvas.getByText('Off')).toBeVisible();
    await userEvent.click(toggle);
    await storybookExpect(toggle).toHaveAttribute('aria-checked', 'true');
    await storybookExpect(canvas.getByText('On')).toBeVisible();
  },
};

export const InitiallyOn: Story = {
  render: () => {
    const DemoOn = (props: React.ComponentProps<typeof Switch>) => {
      const [checked, setChecked] = React.useState(true);
      return (
        <div className="w-180">
          <div className="flex items-center gap-3">
            <Switch
              aria-label="Notifications"
              checked={checked}
              onCheckedChange={setChecked}
              {...props}
            />
            <span className="text-sm">{checked ? 'On' : 'Off'}</span>
          </div>
        </div>
      );
    };
    return <DemoOn />;
  },
};

export const Disabled: Story = {
  render: () => <Demo disabled />,
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('switch', {
      name: 'Notifications',
    });
    await storybookExpect(toggle).toBeDisabled();
    await storybookExpect(toggle).toHaveAttribute('aria-checked', 'false');
  },
};
