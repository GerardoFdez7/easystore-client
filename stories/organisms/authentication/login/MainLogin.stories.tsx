import type { Meta, StoryObj } from '@storybook/nextjs';
import MainLogin from '@organisms/authentication/login/MainLogin';

const meta = {
  title: 'Organisms/Authentication/Login/MainLogin',
  component: MainLogin,
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
} satisfies Meta<typeof MainLogin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="mx-auto max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};
