import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CodesListFormField from '@molecules/products/variant/CodesListFormField';

const meta: Meta<typeof CodesListFormField> = {
  title: 'Molecules/Products/Variant/CodesListFormField',
  component: CodesListFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof CodesListFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      codes: {
        sku: '',
        upc: '',
        ean: '',
        isbn: '',
        barcode: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-[720px]">
        <CodesListFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};
