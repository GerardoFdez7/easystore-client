import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, FormProvider } from 'react-hook-form';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';

type SustainabilityValues = {
  sustainabilities: { certification: string; recycledPercentage: number }[];
};

// Wrapper component that provides form context
const SustainabilityFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: SustainabilityValues;
}) => {
  const methods = useForm<SustainabilityValues>({
    defaultValues: defaultValues || { sustainabilities: [] },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <SustainabilityFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof SustainabilityFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/SustainabilityFormField',
  component: SustainabilityFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field for adding sustainability certifications with a recycled percentage. New entries are validated before they are added to the list.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for the sustainabilities list',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { sustainabilities: [] },
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('No sustainability yet'),
    ).toBeInTheDocument();

    // Adding an empty entry is rejected with validation messages.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add Sustainability' }),
    );
    await storybookExpect(
      canvas.getByText('Certification is required'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Recycled percentage must be at least 0'),
    ).toBeInTheDocument();

    // A percentage above 100 is rejected.
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Certification' }),
      'Organic',
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Recycled Percentage' }),
      '150',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add Sustainability' }),
    );
    await storybookExpect(
      canvas.getByText('Recycled percentage cannot exceed 100'),
    ).toBeInTheDocument();

    // A valid entry is appended and the inputs are reset.
    const percentage = canvas.getByRole('textbox', {
      name: 'Recycled Percentage',
    });
    await userEvent.clear(percentage);
    await userEvent.type(percentage, '80');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add Sustainability' }),
    );
    await storybookExpect(
      canvas.queryByText('No sustainability yet'),
    ).toBeNull();
    await storybookExpect(percentage).toHaveValue('');
    await storybookExpect(
      canvas.getByRole('spinbutton', { name: 'Recycled Percentage' }),
    ).toHaveValue(80);
  },
};

export const WithSustainabilities: Story = {
  args: {
    defaultValues: {
      sustainabilities: [
        { certification: 'FSC', recycledPercentage: 80 },
        { certification: 'GRS', recycledPercentage: 100 },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with existing sustainability entries.',
      },
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.queryByText('No sustainability yet'),
    ).toBeNull();
    await storybookExpect(canvas.getAllByRole('spinbutton')).toHaveLength(2);
    await storybookExpect(canvas.getAllByRole('spinbutton')[1]).toHaveValue(
      100,
    );
  },
};
