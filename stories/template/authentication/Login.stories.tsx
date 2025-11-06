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
      <div style={{ minWidth: '1440px', minHeight: '900px' }}>
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
      <div style={{ filter: 'contrast(1.2) brightness(1.1)' }}>
        <Story />
      </div>
    ),
  ],
};
