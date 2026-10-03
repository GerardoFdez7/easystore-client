import {
  expect as storybookExpect,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@shadcn/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open menu' });
    await storybookExpect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
    const body = within(canvasElement.ownerDocument.body);
    const menu = await body.findByRole('menu');
    await waitFor(() => storybookExpect(menu).toBeVisible());
    await storybookExpect(
      body.getAllByRole('menuitem').map((item) => item.textContent),
    ).toEqual(['Profile', 'Billing', 'Team']);
  },
  title: 'Shadcn/UI/DropdownMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button>Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
