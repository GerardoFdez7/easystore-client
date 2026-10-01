import type { Meta, StoryObj } from '@storybook/nextjs';
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
  title: 'Shadcn/Features/PageThemeProvider',
  component: PageThemeProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: <PageThemeStatus /> },
} satisfies Meta<typeof PageThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
