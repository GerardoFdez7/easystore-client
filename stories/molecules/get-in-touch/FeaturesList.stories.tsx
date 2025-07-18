import type { Meta, StoryObj } from '@storybook/react';
import FeaturesList from '@molecules/get-in-touch/FeatureList';

const meta: Meta<typeof FeaturesList> = {
  title: 'Molecules/GetInTouch/FeaturesList',
  component: FeaturesList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FeaturesList>;

export const Default: Story = {
  render: () => <FeaturesList />,
};
