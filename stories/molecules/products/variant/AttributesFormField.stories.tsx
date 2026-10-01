import AttributesFormField from '@molecules/products/variant/AttributesFormField';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';
import type { Attribute } from '@lib/types/variant';

type AttributesFormValues = {
  attributes: Attribute[];
};

function AttributesFormFixture({ attributes }: { attributes: Attribute[] }) {
  const form = useForm<AttributesFormValues>({
    defaultValues: {
      attributes,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="w-full max-w-2xl">
        <AttributesFormField />
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof AttributesFormField> = {
  title: 'Molecules/Products/Variant/AttributesFormField',
  component: AttributesFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AttributesFormField>;

export const WithAttributes: Story = {
  render: () => (
    <AttributesFormFixture
      attributes={[
        { key: 'Color', value: 'Forest green' },
        { key: 'Capacity', value: '750 ml' },
      ]}
    />
  ),
};

export const Empty: Story = {
  render: () => <AttributesFormFixture attributes={[]} />,
};
