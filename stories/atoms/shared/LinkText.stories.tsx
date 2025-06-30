import type { Meta, StoryObj } from '@storybook/react';
import LinkText from '@atoms/shared/LinkText';

const meta: Meta<typeof LinkText> = {
  title: 'Atoms/Shared/LinkText',
  component: LinkText,
};

export default meta;

type Story = StoryObj<typeof LinkText>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Link text here',
  },
};
