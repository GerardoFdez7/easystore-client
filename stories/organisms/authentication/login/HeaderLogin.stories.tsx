import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderLogin from '@organisms/authentication/login/HeaderLogin';

const meta = {
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
      <div className="min-h-screen bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const WithColoredBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <Story />
      </div>
    ),
  ],
};
