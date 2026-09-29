import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginTemplate from '@templates/authentication/Login';

const meta = {
  title: 'Templates/Authentication/Login',
  component: LoginTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-225 min-w-360">
        <Story />
      </div>
    ),
  ],
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <div className="brightness-110 contrast-125">
        <Story />
      </div>
    ),
  ],
};
