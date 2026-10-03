import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import OwnerMenuItem from '@atoms/dashboard/OwnerMenuItem';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@shadcn/ui/dropdown-menu';

const meta: Meta<typeof OwnerMenuItem> = {
  title: 'Atoms/Dashboard/OwnerMenuItem',
  component: OwnerMenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};
export default meta;

type Story = StoryObj<typeof OwnerMenuItem>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <OwnerMenuItem {...args} icon={User} label="Profile" />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    // The menu renders in a portal outside the canvas.
    const item = await screen.findByRole('menuitem', { name: 'Profile' });
    await waitFor(() => storybookExpect(item).toBeVisible());
    await userEvent.click(item);
    await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);
    // Selecting an item closes the menu and releases the aria-hidden siblings.
    await waitFor(() =>
      storybookExpect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      storybookExpect(
        canvas.getByRole('button', { name: 'Open' }),
      ).toBeVisible(),
    );
  },
};
