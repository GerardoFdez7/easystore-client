import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import DecimalFormField, {
  type DecimalFormFieldProps,
} from '@atoms/products/variant/DecimalFormField';

type DecimalFormValues = {
  amount: string;
};

function DecimalFormFieldFixture(props: DecimalFormFieldProps) {
  const form = useForm<DecimalFormValues>({
    defaultValues: {
      amount: '2.5',
    },
  });

  return (
    <FormProvider {...form}>
      <form className="w-96">
        <DecimalFormField {...props} />
      </form>
    </FormProvider>
  );
}

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('textbox')).toBeInTheDocument();
  },
  title: 'Atoms/Products/Variant/DecimalFormField',
  component: DecimalFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'amount',
    label: 'Weight',
    placeholder: '2',
  },
  argTypes: {
    name: { description: 'React Hook Form field path.' },
    label: { description: 'Visible input label.' },
    placeholder: { description: 'Example decimal value.' },
    itemClassName: { control: false },
    labelClassName: { control: false },
    suffix: { control: false },
  },
  render: (args) => <DecimalFormFieldFixture {...args} />,
} satisfies Meta<typeof DecimalFormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUnit: Story = {
  args: {
    suffix: (
      <span className="text-foreground pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2">
        kg
      </span>
    ),
  },
};
