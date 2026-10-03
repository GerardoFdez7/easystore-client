import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderLogin from '@organisms/authentication/login/HeaderLogin';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { level: 1, name: 'Welcome Back!' }),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByText('Log in to access your EasyStore account.'),
    ).toBeVisible();
  },
  title: 'Organisms/Authentication/Login/HeaderLogin',
  component: HeaderLogin,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderLogin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-sidebar-primary min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export const WithColoredBackground: Story = {
  decorators: [
    (Story) => (
      <div className="from-background to-border min-h-screen bg-linear-to-br">
        <Story />
      </div>
    ),
  ],
};
