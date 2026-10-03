import { expect as storybookExpect, within } from 'storybook/test';
import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof SiteHeader> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/SiteHeader',
  component: SiteHeader,
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
  args: {
    title: 'Dashboard',
  },
};
export default meta;

type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};
