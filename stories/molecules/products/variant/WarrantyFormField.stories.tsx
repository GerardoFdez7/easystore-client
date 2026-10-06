import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    defaultValues: { warranties: [] },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-180">
        <WarrantyFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('No warranties yet'),
    ).toBeInTheDocument();
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Warranty months' }),
      '24',
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Coverage' }),
      'Parts and labor',
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Instructions' }),
      'Contact support',
    );
    await userEvent.click(
      canvas.getAllByRole('button', { name: 'Add warranty' })[0],
    );
    await storybookExpect(canvas.queryByText('No warranties yet')).toBeNull();
    await storybookExpect(
      canvas.getByDisplayValue('Parts and labor'),
    ).toBeInTheDocument();
  },
};
