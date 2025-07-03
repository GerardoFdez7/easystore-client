import { KPICards } from '@molecules/dashboard/KPICards';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof KPICards> = {
  title: 'Molecules/Dashboard/KPICards',
  component: KPICards,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof KPICards>;

export const Default: Story = {};
