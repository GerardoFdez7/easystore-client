import type { Meta, StoryObj } from '@storybook/nextjs';
import MainResetPassword from '@organisms/reset-password/MainResetPassword';

const meta = {
  title: 'Organisms/ResetPassword/MainResetPassword',
  component: MainResetPassword,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // No props for this component
  },
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MainResetPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MainResetPassword />,
  parameters: {
    docs: {
      description: {
        story:
          'Main content area for the reset password page containing the form.',
      },
    },
  },
};

export const MobileView: Story = {
  render: () => <MainResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  render: () => <MainResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const DesktopView: Story = {
  render: () => <MainResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
