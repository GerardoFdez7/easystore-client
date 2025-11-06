import type { Meta, StoryObj } from '@storybook/nextjs';
import FeaturesList from '@molecules/landing/get-in-touch/FeatureList';

const meta: Meta<typeof FeaturesList> = {
  title: 'Molecules/Landing/GetInTouch/FeaturesList',
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
