import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PriceConditionFormField from '@molecules/products/variant/PriceConditionFormField';

const meta: Meta<typeof PriceConditionFormField> = {
  title: 'Molecules/Products/Variant/PriceConditionFormField',
  component: PriceConditionFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PriceConditionFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      priceCondition: {
        price: '',
        condition: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <PriceConditionFormField />
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};
