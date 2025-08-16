import type { Meta, StoryObj } from '@storybook/react';
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
  title: 'Shadcn/Drawer',
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
