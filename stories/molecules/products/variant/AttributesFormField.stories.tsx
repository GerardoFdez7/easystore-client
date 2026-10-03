import { expect as storybookExpect, userEvent } from 'storybook/test';
import AttributesFormField from '@molecules/products/variant/AttributesFormField';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByDisplayValue('Color'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByDisplayValue('Forest green'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByDisplayValue('750 ml'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('No attributes yet')).toBeNull();
  },
};

export const Empty: Story = {
  render: () => <AttributesFormFixture attributes={[]} />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('No attributes yet'),
    ).toBeInTheDocument();
    const add = canvas.getByRole('button', { name: 'Add Attribute' });
    await storybookExpect(add).toBeDisabled();

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Attribute key' }),
      'Size',
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Attribute value' }),
      'Large',
    );
    await storybookExpect(add).toBeEnabled();
    await userEvent.click(add);

    await storybookExpect(canvas.queryByText('No attributes yet')).toBeNull();
    await storybookExpect(canvas.getByDisplayValue('Size')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByDisplayValue('Large'),
    ).toBeInTheDocument();
    await storybookExpect(add).toBeDisabled();
  },
};
