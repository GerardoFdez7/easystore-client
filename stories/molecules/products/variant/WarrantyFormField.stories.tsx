import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import WarrantyFormField from '@molecules/products/variant/WarrantyFormField';

const meta: Meta<typeof WarrantyFormField> = {
  title: 'Molecules/Products/Variant/WarrantyFormField',
  component: WarrantyFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof WarrantyFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      months: '',
      coverage: '',
      instructions: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-[720px]">
        <WarrantyFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};
