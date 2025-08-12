import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Combobox } from '@shadcn/ui/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'shadcn/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Combobox>;

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'watermelon', label: 'Watermelon' },
];

const ComboboxBasicExample: React.FC = () => {
  const [value, setValue] = React.useState<string | undefined>();
  return (
    <Combobox
      items={FRUITS}
      value={value}
      onValueChange={setValue}
      placeholder="Pick a fruit"
    />
  );
};

export const Basic: Story = { render: () => <ComboboxBasicExample /> };

export const Disabled: Story = {
  args: {
    items: FRUITS,
    disabled: true,
    placeholder: 'Disabled',
  },
};
