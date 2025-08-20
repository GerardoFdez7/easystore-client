import type { Meta, StoryObj } from '@storybook/nextjs';
import BackButton from '@molecules/shared/BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Molecules/Shared/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  // Wrap in a relative box so the absolute button is visible
  decorators: [
    (Story) => (
      <div className="relative h-40 w-80 rounded border border-gray-200 bg-gray-50">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: { control: 'text' },
    label: { control: 'text' },
    onBack: { action: 'back' }, // shows an action in the SB panel, no extra imports needed
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    label: 'Back',
    className: 'top-4 left-4',
  },
};

export const TopLeftTight: Story = {
  args: {
    label: 'Back',
    className: 'top-2 left-2',
  },
};

export const TopRight: Story = {
  args: {
    label: 'Back',
    className: 'top-4 right-4',
  },
};
