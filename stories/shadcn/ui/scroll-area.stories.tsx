import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScrollArea } from '@shadcn/ui/scroll-area';
import { Separator } from '@shadcn/ui/separator';

const activity = [
  'Order #1048 was paid',
  'Order #1047 was shipped',
  'Inventory count was updated',
  'A new customer registered',
  'Summer collection was published',
  'Order #1046 was refunded',
  'Store details were updated',
  'A discount code was created',
];

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Recent activity' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('A discount code was created'),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ActivityFeed: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border">
      <div
        className="flex flex-col gap-3 p-4"
        role="region"
        aria-label="Activity feed"
        tabIndex={0}
      >
        <h3 className="font-medium">Recent activity</h3>
        {activity.map((event) => (
          <div key={event} className="flex flex-col gap-3">
            <p className="text-sm">{event}</p>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
