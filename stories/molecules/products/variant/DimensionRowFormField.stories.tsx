import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import DimensionRowFormField from '@molecules/products/variant/DimensionRowFormField';

const meta: Meta<typeof DimensionRowFormField> = {
  title: 'Molecules/Products/Variant/DimensionRowFormField',
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
      <div className="w-180">
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
      <div className="w-180">
        <DimensionRowFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Height' }),
    ).toHaveValue('');
    await storybookExpect(
      canvas.getByRole('spinbutton', { name: 'Width' }),
    ).toHaveValue(null);
    await storybookExpect(
      canvas.getByRole('spinbutton', { name: 'Length' }),
    ).toHaveValue(null);
    const height = canvas.getByRole('textbox', { name: 'Height' });
    await userEvent.type(height, '12.5');
    await storybookExpect(height).toHaveValue('12.5');
  },
};

export const WithValues: Story = {
  render: () => <WithValuesStory />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Height' }),
    ).toHaveValue('10.5');
    await storybookExpect(
      canvas.getByRole('spinbutton', { name: 'Width' }),
    ).toHaveValue(8.2);
    await storybookExpect(
      canvas.getByRole('spinbutton', { name: 'Length' }),
    ).toHaveValue(15);
  },
};
