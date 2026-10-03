import { expect as storybookExpect, within } from 'storybook/test';
import { KPICards } from '@molecules/dashboard/KPICards';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof KPICards> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Sales|Orders|Customers/),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Dashboard/KPICards',
  component: KPICards,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-75">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof KPICards>;

export const Default: Story = {};
