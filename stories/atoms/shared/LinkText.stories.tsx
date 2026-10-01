import LinkText from '@atoms/shared/LinkText';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof LinkText> = {
  title: 'Atoms/Shared/LinkText',
  component: LinkText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Destination passed to the Next.js link.',
    },
    children: {
      control: 'text',
      description: 'Linked content.',
    },
    className: {
      control: 'text',
      description: 'Additional classes applied to the link.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkText>;

export const Default: Story = {
  args: {
    href: '/en/products',
    children: 'View all products',
  },
};

export const Muted: Story = {
  args: {
    href: '/en/terms',
    children: 'Read the terms',
    className: 'text-muted-foreground',
  },
};
