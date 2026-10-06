import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import PersonalizationOptionsFormField from '@molecules/products/variant/PersonalizationOptionsFormField';

const meta: Meta<typeof PersonalizationOptionsFormField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('Engraving')).toBeInTheDocument();
  },
  title: 'Molecules/Products/Variant/PersonalizationOptionsFormField',
  component: PersonalizationOptionsFormField,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof PersonalizationOptionsFormField>;

function Demo() {
  const form = useForm({
    defaultValues: {
      personalizationOptions: ['Engraving', 'Custom Color'],
    },
  });

  return (
    <Form {...form}>
      <PersonalizationOptionsFormField />
    </Form>
  );
}

export const Default: Story = { render: () => <Demo /> };
