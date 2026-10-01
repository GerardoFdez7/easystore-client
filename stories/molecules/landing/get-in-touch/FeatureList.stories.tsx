import FeatureList from '@molecules/landing/get-in-touch/FeatureList';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof FeatureList> = {
  title: 'Molecules/Landing/GetInTouch/FeatureList',
  component: FeatureList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FeatureList>;

export const Default: Story = {};
