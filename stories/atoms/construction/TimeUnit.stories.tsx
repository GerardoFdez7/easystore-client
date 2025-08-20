import type { Meta, StoryObj } from '@storybook/nextjs';
import TimeUnit from '@atoms/construction/TimeUnit';

const meta: Meta<typeof TimeUnit> = {
  title: 'Atoms/Construction/TimeUnit',
  parameters: {
    layout: 'centered',
  },
  component: TimeUnit,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 999 },
      description: 'Numeric value to display',
    },
    label: {
      control: 'text',
      description: 'Label text displayed below the value',
    },
  },
  args: {
    value: 42,
    label: 'Days',
  },
};

export default meta;

type Story = StoryObj<typeof TimeUnit>;

export const Default: Story = {};

export const Days: Story = {
  args: {
    value: 15,
    label: 'Days',
  },
};

export const Hours: Story = {
  args: {
    value: 8,
    label: 'Hours',
  },
};

export const Minutes: Story = {
  args: {
    value: 23,
    label: 'Minutes',
  },
};

export const Seconds: Story = {
  args: {
    value: 45,
    label: 'Seconds',
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
    label: 'Seconds',
  },
};

export const LargeValue: Story = {
  args: {
    value: 999,
    label: 'Days',
  },
};
