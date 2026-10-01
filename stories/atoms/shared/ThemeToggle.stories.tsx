import ThemeToggle from '@atoms/shared/ThemeToggle';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ThemeProvider } from '@shadcn/features/theme-provider';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/Shared/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme-toggle">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
