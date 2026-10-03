import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert, AlertDescription, AlertTitle } from '@shadcn/ui/alert';

const meta: Meta<typeof Alert> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Heads up!|Error!/),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Alert',
  tags: ['autodocs'],
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
