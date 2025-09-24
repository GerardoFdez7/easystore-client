import type { Meta, StoryObj } from '@storybook/nextjs';
import StateCombobox from '@molecules/shared/StateCombobox';

const meta: Meta<typeof StateCombobox> = {
  title: 'molecules/shared/StateCombobox',
  component: StateCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    countryId: {
      control: 'text',
      description: 'The ID of the selected country',
    },
    value: {
      control: 'text',
      description: 'The selected state value',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when the selected value changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the combobox',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockStatesUS = [
  { label: 'California', value: 'CA' },
  { label: 'Texas', value: 'TX' },
  { label: 'New York', value: 'NY' },
];

export const Default: Story = {
  args: {
    countryId: 'US',
    placeholder: 'Select a state',
    options: mockStatesUS,
  },
};

export const WithSelectedValue: Story = {
  args: {
    countryId: 'US',
    value: 'CA',
    placeholder: 'Select a state',
    options: mockStatesUS,
  },
};

export const NoCountrySelected: Story = {
  args: {
    countryId: undefined,
    placeholder: 'Select a state',
    options: [],
  },
};

export const Empty: Story = {
  args: {
    countryId: 'US',
    placeholder: 'No states available',
    options: [],
  },
};

export const Loading: Story = {
  args: {
    countryId: 'US',
    placeholder: 'Loading states...',
    loading: true,
    options: [],
  },
};
