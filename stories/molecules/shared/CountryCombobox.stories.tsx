import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

// Radix hides the page behind an open popover; close it so only the settled
// state is audited for accessibility.
async function closePopover() {
  await userEvent.keyboard('{Escape}{Escape}');
  await waitFor(() =>
    storybookExpect(screen.queryByRole('listbox')).toBeNull(),
  );
}

export const Default: Story = {
  args: {
    placeholder: 'Select a country',
    options: mockCountries,
    onValueChange: fn(),
  },
  play: async ({ canvas, args }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Select a country' });
    await waitFor(() => storybookExpect(trigger).toBeEnabled());
    await userEvent.click(trigger);
    await storybookExpect(await screen.findAllByRole('option')).toHaveLength(5);

    await userEvent.click(screen.getByRole('option', { name: /Canada/ }));
    await storybookExpect(args.onValueChange).toHaveBeenCalledWith('CA');
    await closePopover();
  },
};

export const WithSelectedValue: Story = {
  args: {
    value: 'US',
    placeholder: 'Select a country',
    options: mockCountries,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Select a country' }),
    ).toHaveTextContent('United States');
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Countries',
    options: [],
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Countries' });
    await waitFor(() => storybookExpect(trigger).toBeEnabled());
    await userEvent.click(trigger);
    await storybookExpect(
      await screen.findByText('No country found'),
    ).toBeInTheDocument();
    await storybookExpect(screen.queryAllByRole('option')).toHaveLength(0);
    await closePopover();
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Loading countries...',
    loading: true,
    options: mockCountries,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Loading countries...' }),
    ).toBeDisabled();
  },
};
