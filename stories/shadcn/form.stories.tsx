import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import { Button } from '@shadcn/ui/button';
import { useForm } from 'react-hook-form';
import React from 'react';

const meta: Meta<typeof Form> = {
  title: 'Shadcn/Form',
  parameters: {
    layout: 'centered',
  },
  component: Form,
};
export default meta;

type Story = StoryObj<typeof Form>;

const DemoForm: React.FC = () => {
  const form = useForm<{ email: string }>({ defaultValues: { email: '' } });
  const onSubmit = (data: { email: string }) => alert(JSON.stringify(data));
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="max-w-sm space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const Default: Story = { render: () => <DemoForm /> };
