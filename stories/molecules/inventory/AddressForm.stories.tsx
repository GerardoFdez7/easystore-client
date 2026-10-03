import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AddressForm from '@molecules/inventory/AddressForm';

const meta: Meta<typeof AddressForm> = {
  title: 'Molecules/Inventory/AddressForm',
  component: AddressForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form component for creating new addresses with country and state selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback function when form is submitted',
      action: 'submit',
    },
    onCancel: {
      description: 'Callback function when cancel button is clicked',
      action: 'cancel',
    },
    isSubmitting: {
      description: 'Loading state for form submission',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    isSubmitting: false,
  },
  play: async ({ canvas, args }) => {
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Name' }),
      'Main Warehouse',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

    // Invalid form: validation messages appear and nothing is submitted.
    await storybookExpect(
      await canvas.findByText('Address line 1 must be at least 1 character'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Country is required'),
    ).toBeInTheDocument();
    await storybookExpect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await storybookExpect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    isSubmitting: true,
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Street Address' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Cancel' }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Loading Save' }),
    ).toBeDisabled();
  },
};
