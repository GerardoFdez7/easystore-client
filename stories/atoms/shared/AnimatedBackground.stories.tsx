import type { Meta, StoryObj } from '@storybook/nextjs';
import AnimatedBackground from '@atoms/shared/AnimatedBackground';

const meta: Meta<typeof AnimatedBackground> = {
  title: 'Atoms/Shared/AnimatedBackground',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
  component: AnimatedBackground,
};

export default meta;

type Story = StoryObj<typeof AnimatedBackground>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full overflow-hidden">
        <Story />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white">
              Animated Background
            </h2>
            <p className="mt-2 text-white/80">
              This background features animated gradient orbs that pulse and
              create a dynamic visual effect.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
};

export const WithLightBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full overflow-hidden bg-gray-100">
        <Story />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-lg bg-black/10 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800">Light Theme</h2>
            <p className="mt-2 text-gray-600">
              The animated background adapts to light themes with subtle opacity
              adjustments.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
};

export const WithGradientBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'gradient',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full overflow-hidden">
        <Story />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-lg bg-white/20 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white">
              Gradient Background
            </h2>
            <p className="mt-2 text-white/90">
              The animated orbs blend beautifully with gradient backgrounds.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
};
