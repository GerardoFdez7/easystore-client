import type { Meta, StoryObj } from '@storybook/nextjs';
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
  title: 'Shadcn/Card',
  parameters: {
    layout: 'centered',
  },
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
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
