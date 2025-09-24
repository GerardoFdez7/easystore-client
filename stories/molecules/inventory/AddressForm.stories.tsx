import type { Meta, StoryObj } from '@storybook/nextjs';
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
    onSubmit: async () => {},
    onCancel: () => {},
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: async () => {},
    onCancel: () => {},
    isSubmitting: true,
  },
};
