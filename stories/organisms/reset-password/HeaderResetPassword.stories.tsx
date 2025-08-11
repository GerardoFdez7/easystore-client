import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderResetPassword from '@organisms/reset-password/HeaderResetPassword';

const meta = {
  title: 'Organisms/ResetPassword/HeaderResetPassword',
  component: HeaderResetPassword,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof HeaderResetPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeaderResetPassword />,
};

export const MobileView: Story = {
  render: () => <HeaderResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  render: () => <HeaderResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const DesktopView: Story = {
  render: () => <HeaderResetPassword />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
