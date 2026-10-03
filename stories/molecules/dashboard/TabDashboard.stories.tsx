import { expect as storybookExpect, userEvent } from 'storybook/test';
import TabDashboard from '@molecules/dashboard/TabDashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TabDashboard> = {
  title: 'Molecules/Dashboard/TabDashboard',
  component: TabDashboard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-200">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TabDashboard>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('tab')).toHaveLength(5);
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Sales' }),
    ).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(canvas.getByRole('tab', { name: 'Orders' }));
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Orders' }),
    ).toHaveAttribute('aria-selected', 'true');
    await storybookExpect(
      canvas.getByRole('tab', { name: 'Sales' }),
    ).toHaveAttribute('aria-selected', 'false');
  },
};
