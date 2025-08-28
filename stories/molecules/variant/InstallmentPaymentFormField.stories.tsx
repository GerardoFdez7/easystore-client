import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InstallmentPaymentFormField from '@molecules/variant/InstallmentPaymentFormField';

const meta: Meta<typeof InstallmentPaymentFormField> = {
  title: 'Molecules/Variant/InstallmentPaymentFormField',
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
      installmentPayment: {
        months: '',
        interestRate: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-[400px]">
        <InstallmentPaymentFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};
