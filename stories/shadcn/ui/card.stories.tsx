import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Card> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('Pro plan')).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-95">
      <CardHeader>
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>
          Grow your store with advanced features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Includes analytics, custom domains and more.</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Choose plan</Button>
      </CardFooter>
    </Card>
  ),
};
