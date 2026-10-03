import { expect as storybookExpect, userEvent } from 'storybook/test';
import WeightFormField from '@molecules/products/variant/WeightFormField';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Weight' }),
    ).toHaveValue('2.5');
    await storybookExpect(canvas.getByText('kg')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  render: () => <WeightFormFixture weight="" />,
  play: async ({ canvas }) => {
    const weight = canvas.getByRole('textbox', { name: 'Weight' });
    await storybookExpect(weight).toHaveValue('');
    await userEvent.type(weight, '3');
    await storybookExpect(weight).toHaveValue('3');
  },
};
