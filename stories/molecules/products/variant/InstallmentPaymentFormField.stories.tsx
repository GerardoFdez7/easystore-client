import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InstallmentPaymentFormField from '@molecules/products/variant/InstallmentPaymentFormField';

const meta: Meta<typeof InstallmentPaymentFormField> = {
  title: 'Molecules/Products/Variant/InstallmentPaymentFormField',
  component: InstallmentPaymentFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InstallmentPaymentFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      installmentPayments: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-100">
        <InstallmentPaymentFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('No installment payments yet'),
    ).toBeInTheDocument();
    await userEvent.type(canvas.getByRole('textbox', { name: 'Months' }), '12');
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Interest rate' }),
      '5',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add installment payment' }),
    );
    await storybookExpect(
      canvas.queryByText('No installment payments yet'),
    ).toBeNull();
    await storybookExpect(canvas.getByDisplayValue('12')).toBeInTheDocument();
  },
};
