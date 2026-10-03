import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageThemeProvider, usePageTheme } from '@shadcn/features/page-theme';

function PageThemeStatus() {
  const { isDarkModeEnabled } = usePageTheme();

  return (
    <p role="status">
      Dark mode is {isDarkModeEnabled ? 'available' : 'unavailable'} for this
      page.
    </p>
  );
}

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('status')).toBeInTheDocument();
  },
  title: 'Shadcn/Features/PageThemeProvider',
  component: PageThemeProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: <PageThemeStatus /> },
} satisfies Meta<typeof PageThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
