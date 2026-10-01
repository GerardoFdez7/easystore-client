import BadgeTag from '@atoms/shared/BadgeTag';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof BadgeTag> = {
  title: 'Atoms/Shared/BadgeTag',
  component: BadgeTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Text displayed inside the badge.',
    },
    className: {
      control: 'text',
      description: 'Additional classes applied to the badge.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BadgeTag>;

export const Default: Story = {
  args: {
    tag: 'Sustainable',
  },
};

export const Emphasized: Story = {
  args: {
    tag: 'Limited edition',
    className: 'border-primary text-primary',
  },
};
