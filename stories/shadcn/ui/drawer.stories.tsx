import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@shadcn/ui/drawer';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Drawer> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Open drawer' }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    const page = within(canvasElement.ownerDocument.body);
    await storybookExpect(
      await page.findByRole('heading', { name: 'Menu' }),
    ).toBeVisible();
  },
  title: 'Shadcn/UI/Drawer',
  tags: ['autodocs'],
  component: Drawer,
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Quick actions and shortcuts</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Content inside the drawer.</div>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
