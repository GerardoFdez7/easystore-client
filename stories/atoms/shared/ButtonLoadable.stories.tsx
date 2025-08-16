import type { Meta, StoryObj } from '@storybook/react';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';

const meta: Meta<typeof ButtonLoadable> = {
  title: 'Atoms/Shared/ButtonLoadable',
  component: ButtonLoadable,
  args: { children: 'Submit', isLoading: false },
};

export default meta;

type Story = StoryObj<typeof ButtonLoadable>;

export const Default: Story = {};
