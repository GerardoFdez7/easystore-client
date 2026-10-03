import { expect as storybookExpect, within } from 'storybook/test';
import Sidebar from '@organisms/shared/Sidebar';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Sidebar> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Shared/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
