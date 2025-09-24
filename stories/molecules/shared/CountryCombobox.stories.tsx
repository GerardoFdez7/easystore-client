import type { Meta, StoryObj } from '@storybook/nextjs';
import CountryCombobox from '@molecules/shared/CountryCombobox';

const meta: Meta<typeof CountryCombobox> = {
  title: 'molecules/shared/CountryCombobox',
  component: CountryCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected country value',
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

const mockCountries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'Mexico', value: 'MX' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select a country',
    options: mockCountries,
  },
};

export const WithSelectedValue: Story = {
  args: {
    value: 'US',
    placeholder: 'Select a country',
    options: mockCountries,
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Countries',
    options: [],
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Loading countries...',
    loading: true,
    options: mockCountries,
  },
};
