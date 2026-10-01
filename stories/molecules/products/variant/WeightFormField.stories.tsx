import WeightFormField from '@molecules/products/variant/WeightFormField';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

type WeightFormValues = {
  weight: string;
};

function WeightFormFixture({ weight }: WeightFormValues) {
  const form = useForm<WeightFormValues>({
    defaultValues: {
      weight,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="w-96">
        <WeightFormField />
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof WeightFormField> = {
  title: 'Molecules/Products/Variant/WeightFormField',
  component: WeightFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeightFormField>;

export const Default: Story = {
  render: () => <WeightFormFixture weight="2.5" />,
};

export const Empty: Story = {
  render: () => <WeightFormFixture weight="" />,
};
