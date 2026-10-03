import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole('combobox');
    await storybookExpect(combobox).toHaveTextContent('Select a state');
    await storybookExpect(combobox).toBeDisabled();
  },
};

export const WithSelectedValue: Story = {
  args: {
    countryId: 'US',
    value: 'CA',
    placeholder: 'Select a state',
    options: mockStatesUS,
  },
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole('combobox');
    await storybookExpect(combobox).toHaveTextContent('California');
    await storybookExpect(combobox).toBeDisabled();
  },
};

export const NoCountrySelected: Story = {
  args: {
    countryId: undefined,
    placeholder: 'Select a state',
    options: [],
  },
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole('combobox');
    await storybookExpect(combobox).toHaveTextContent(
      'Please select a country first',
    );
    await storybookExpect(combobox).toBeDisabled();
  },
};

export const Empty: Story = {
  args: {
    countryId: 'US',
    placeholder: 'No states available',
    options: [],
  },
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole('combobox');
    await storybookExpect(combobox).toHaveTextContent('No states available');
    await storybookExpect(combobox).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    countryId: 'US',
    placeholder: 'Loading states...',
    loading: true,
    options: [],
  },
  play: async ({ canvas }) => {
    const combobox = canvas.getByRole('combobox');
    await storybookExpect(combobox).toHaveTextContent('Loading states...');
    await storybookExpect(combobox).toBeDisabled();
  },
};
