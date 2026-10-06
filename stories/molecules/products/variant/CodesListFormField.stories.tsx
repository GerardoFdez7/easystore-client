import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import CodesListFormField from '@molecules/products/variant/CodesListFormField';

const meta: Meta<typeof CodesListFormField> = {
  title: 'Molecules/Products/Variant/CodesListFormField',
  component: CodesListFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof CodesListFormField>;

function DefaultStory() {
  const methods = useForm({
    defaultValues: {
      codes: {
        sku: '',
        upc: '',
        ean: '',
        isbn: '',
        barcode: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-180">
        <CodesListFormField />
      </div>
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  play: async ({ canvas }) => {
    for (const label of ['SKU', 'UPC', 'EAN', 'ISBN', 'Barcode']) {
      await storybookExpect(
        canvas.getByRole('textbox', { name: label }),
      ).toHaveValue('');
    }
    const sku = canvas.getByRole('textbox', { name: 'SKU' });
    await userEvent.type(sku, 'ABC-1234');
    await storybookExpect(sku).toHaveValue('ABC-1234');
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'UPC' }),
    ).toHaveValue('');
  },
};
