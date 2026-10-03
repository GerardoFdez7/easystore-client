import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shadcn/ui/tabs';

const meta: Meta<typeof Tabs> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Account' }),
    ).toHaveAttribute('data-state', 'active');
    await storybookExpect(
      canvas.getByText('Make changes to your account here.'),
    ).toBeVisible();
  },
  title: 'Shadcn/UI/Tabs',
  tags: ['autodocs'],
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-100">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};
