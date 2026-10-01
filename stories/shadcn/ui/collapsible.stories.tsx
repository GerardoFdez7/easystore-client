import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '@shadcn/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shadcn/ui/collapsible';

const meta = {
  title: 'Shadcn/UI/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OrderDetails: Story = {
  render: () => (
    <Collapsible className="flex w-80 flex-col gap-3">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle order details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-4">
        Order #4189 is packed and ready to ship.
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const OpenByDefault: Story = {
  render: () => (
    <Collapsible defaultOpen className="flex w-80 flex-col gap-3">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle store details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-4">
        This store accepts online orders every day.
      </CollapsibleContent>
    </Collapsible>
  ),
};
