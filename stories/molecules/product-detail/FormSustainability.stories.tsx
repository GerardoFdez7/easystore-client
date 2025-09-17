import type { Meta, StoryObj } from '@storybook/react';
import FormSustainability from '@molecules/product-detail/FormSustainability';
import { Dialog, DialogTrigger } from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';
// import { fn } from '@storybook/test';

const meta: Meta<typeof FormSustainability> = {
  title: 'Molecules/Product Detail/FormSustainability',
  component: FormSustainability,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: () => {},
    onCancel: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Wrapper to show the form in a dialog
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormWrapper = (args: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Form</Button>
    </DialogTrigger>
    <FormSustainability {...args} />
  </Dialog>
);

export const Default: Story = {
  render: (args) => <FormWrapper {...args} />,
};
