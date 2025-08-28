import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import MainVariant from '@organisms/variant/MainVariant';

const MockMainVariant = () => {
  const form = useForm();

  const handleSubmit = (data: unknown) => {
    console.log('Form submitted:', data);
  };

  return (
    <main>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(handleSubmit)(e);
            }}
            className="space-y-6"
          >
            <MainVariant />
          </form>
        </Form>
      </FormProvider>
    </main>
  );
};

const meta: Meta<typeof MainVariant> = {
  title: 'Organisms/Variant/MainVariant',
  component: MockMainVariant,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainVariant>;

export const Default: Story = {};
