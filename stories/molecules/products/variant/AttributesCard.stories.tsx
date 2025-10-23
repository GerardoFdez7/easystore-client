import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import AttributesCard from '@molecules/products/variant/AttributesFormField';
import type { Attribute } from '@lib/types/variant';
import AttributesFormField from '@molecules/products/variant/AttributesFormField';

const meta: Meta<typeof AttributesCard> = {
  title: 'Molecules/Products/Variant/AttributesFormField',
  component: AttributesFormField,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AttributesCard>;

interface FormData {
  attributes: Attribute[];
}

const Wrapper: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      attributes: [
        { key: 'Color', value: 'Red' },
        { key: 'Size', value: 'Large' },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-2xl space-y-4">
        <AttributesFormField />
        <div className="bg-muted mt-4 rounded-lg p-4">
          <h4 className="mb-2 text-sm font-medium">Form Values:</h4>
          <pre className="text-xs">
            {JSON.stringify(methods.watch('attributes'), null, 2)}
          </pre>
        </div>
      </form>
    </FormProvider>
  );
};

const EmptyWrapper: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      attributes: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-2xl space-y-4">
        <AttributesFormField />
        <div className="bg-muted mt-4 rounded-lg p-4">
          <h4 className="mb-2 text-sm font-medium">Form Values:</h4>
          <pre className="text-xs">
            {JSON.stringify(methods.watch('attributes'), null, 2)}
          </pre>
        </div>
      </form>
    </FormProvider>
  );
};

export const Default: Story = { render: () => <Wrapper /> };
export const Empty: Story = { render: () => <EmptyWrapper /> };
