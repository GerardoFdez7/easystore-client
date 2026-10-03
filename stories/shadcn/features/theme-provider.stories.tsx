import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeProvider, useTheme } from '@shadcn/features/theme-provider';
import { Button } from '@shadcn/ui/button';

function ThemeControls() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <section className="flex flex-col gap-4" aria-label="Theme controls">
      <p role="status">
        Selected theme: {theme}. Resolved theme: {resolvedTheme}.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setTheme('light')}>
          Light
        </Button>
        <Button variant="outline" onClick={() => setTheme('dark')}>
          Dark
        </Button>
        <Button variant="outline" onClick={() => setTheme('system')}>
          System
        </Button>
      </div>
    </section>
  );
}

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('region', { name: 'Theme controls' }),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/Features/ThemeProvider',
  component: ThemeProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: <ThemeControls />,
    defaultTheme: 'light',
    storageKey: 'easystore-story-theme',
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LightByDefault: Story = {};

export const SystemTheme: Story = {
  args: { defaultTheme: 'system', storageKey: 'easystore-system-story-theme' },
};
