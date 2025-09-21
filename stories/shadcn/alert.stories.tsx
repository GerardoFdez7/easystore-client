import type { Meta, StoryObj } from '@storybook/nextjs';
import { Alert, AlertDescription, AlertTitle } from '@shadcn/ui/alert';

const meta: Meta<typeof Alert> = {
  title: 'Shadcn/Alert',
  parameters: {
    layout: 'centered',
  },
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
  args: { children: 'Alert Content', variant: 'default' },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Your action could not be completed.</AlertDescription>
      </>
    ),
  },
};
