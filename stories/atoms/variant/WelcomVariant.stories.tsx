import WelcomeVariant from '@atoms/variant/WelcomeVariant';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof WelcomeVariant> = {
  title: 'Atoms/Variant/WelcomeVariant',
  component: WelcomeVariant,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof WelcomeVariant>;

export const Default: Story = {};
