import { expect as storybookExpect, screen, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
      price: '',
      condition: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <PriceConditionFormField currency="GTQ" />
    </FormProvider>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  play: async ({ canvas }) => {
    const price = canvas.getByRole('textbox', { name: 'Price' });
    await userEvent.clear(price);
    await userEvent.type(price, '2000');
    await storybookExpect(
      (price as HTMLInputElement).value.replace(/\D/g, ''),
    ).toMatch(/^2000/);
    await storybookExpect(canvas.getByText('GTQ')).toBeInTheDocument();
    const condition = canvas.getByRole('combobox', { name: 'Condition' });
    await userEvent.click(condition);
    await userEvent.click(await screen.findByRole('option', { name: 'Used' }));
    await storybookExpect(condition).toHaveTextContent('Used');
  },
};
