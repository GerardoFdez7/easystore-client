import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileDraftProvider } from '@contexts/ProfileDraftContext';
import SidebarProfile from '@organisms/profile/SidebarProfile';

const meta: Meta<typeof SidebarProfile> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Store Profile' }),
    ).toBeInTheDocument();
  },
  component: SidebarProfile,
  title: 'Organisms/Profile/SidebarProfile',
  decorators: [
    (Story) => (
      <ProfileDraftProvider>
        <Story />
      </ProfileDraftProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarProfile>;

export const Default: Story = {};
