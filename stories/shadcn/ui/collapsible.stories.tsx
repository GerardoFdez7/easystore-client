import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Toggle order details',
    });
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await storybookExpect(
      canvas.getByText('Order #4189 is packed and ready to ship.'),
    ).toBeVisible();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Toggle store details',
    });
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
    await storybookExpect(
      canvas.getByText('This store accepts online orders every day.'),
    ).toBeVisible();
  },
};
