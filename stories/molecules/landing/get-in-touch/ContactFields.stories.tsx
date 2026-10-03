import { expect as storybookExpect, screen, userEvent } from 'storybook/test';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import ContactFields from '@molecules/landing/get-in-touch/ContactFields';

const meta: Meta<typeof ContactFields> = {
  title: 'Molecules/Landing/GetInTouch/ContactFields',
  component: ContactFields,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContactFields>;

const ContactFieldsWrapper: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      businessEmail: '',
      businessPhone: '',
      company: '',
      websiteUrl: '',
      country: '',
      annualRevenue: '',
      isAgency: 'no',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void methods.handleSubmit((data) => {
      console.log('submitted:', data);
    });
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit}>
          <ContactFields />
        </form>
      </Form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <ContactFieldsWrapper />,
  play: async ({ canvas }) => {
    const fullName = canvas.getByRole('textbox', { name: 'Full Name' });
    await userEvent.type(fullName, 'Ada Lovelace');
    await storybookExpect(fullName).toHaveValue('Ada Lovelace');

    const email = canvas.getByRole('textbox', { name: 'Business Email' });
    await userEvent.type(email, 'ada@example.com');
    await storybookExpect(email).toHaveValue('ada@example.com');

    await storybookExpect(
      canvas.getByRole('radio', { name: 'No' }),
    ).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', { name: 'Yes' }));
    await storybookExpect(
      canvas.getByRole('radio', { name: 'Yes' }),
    ).toBeChecked();
    await storybookExpect(
      canvas.getByRole('radio', { name: 'No' }),
    ).not.toBeChecked();

    await userEvent.click(
      canvas.getByRole('combobox', { name: 'Annual online revenue' }),
    );
    await userEvent.click(await screen.findByRole('option', { name: '$1M+' }));
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Annual online revenue' }),
    ).toHaveTextContent('$1M+');
  },
};
