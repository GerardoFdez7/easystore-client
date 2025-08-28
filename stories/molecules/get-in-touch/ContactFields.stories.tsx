import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import ContactFields from '@molecules/get-in-touch/ContactFields';

const meta: Meta<typeof ContactFields> = {
  title: 'Molecules/GetInTouch/ContactFields',
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
};
