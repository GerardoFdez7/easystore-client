import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@shadcn/ui/radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'shadcn/RadioGroup',
  component: RadioGroup,
  subcomponents: { RadioGroupItem },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  args: {
    defaultValue: 'apple',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="apple" id="rg-apple" />
        <span>Apple</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="banana" id="rg-banana" />
        <span>Banana</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="mango" id="rg-mango" />
        <span>Mango</span>
      </label>
    </RadioGroup>
  ),
};

const RadioGroupControlledExample: React.FC = () => {
  const [value, setValue] = React.useState('b');

  return (
    <div className="space-y-2">
      <RadioGroup value={value} onValueChange={setValue}>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="a" id="rg-a" />
          <span>Option A</span>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="b" id="rg-b" />
          <span>Option B</span>
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="c" id="rg-c" />
          <span>Option C</span>
        </label>
      </RadioGroup>
      <div className="text-sm">
        Selected: <b>{value}</b>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <RadioGroupControlledExample />,
};

export const DisabledItems: Story = {
  args: {
    defaultValue: 'x',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="x" id="rg-x" />
        <span>Enabled</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="y" id="rg-y" disabled />
        <span>Disabled</span>
      </label>
    </RadioGroup>
  ),
};
