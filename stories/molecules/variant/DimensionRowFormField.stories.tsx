import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DimensionRowFormField from '@molecules/variant/DimensionRowFormField';

const meta: Meta<typeof DimensionRowFormField> = {
  title: 'Molecules/Variant/DimensionRowFormField',
  component: DimensionRowFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof DimensionRowFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      dimensions: {
        height: '',
        width: '',
        length: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-[720px]">
        <DimensionRowFormField />
      </div>
    </FormProvider>
  );
}

function WithValuesStory() {
  const methods = useForm({
    defaultValues: {
      dimensions: {
        height: '10.5',
        width: '8.2',
        length: '15.0',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-[720px]">
        <DimensionRowFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const WithValues: Story = {
  render: () => <WithValuesStory />,
};
