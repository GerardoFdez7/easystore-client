import { expect as storybookExpect, within } from 'storybook/test';
import FeatureList from '@molecules/landing/get-in-touch/FeatureList';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = within(canvas.getByRole('list')).getAllByRole('listitem');
    await storybookExpect(items).toHaveLength(4);
    await storybookExpect(items[0]).toHaveTextContent('Everything Unlimited');
    await storybookExpect(items[3]).toHaveTextContent('24/7 priority support');
  },
};
