import { expect as storybookExpect, within } from 'storybook/test';
import BadgeTag from '@atoms/shared/BadgeTag';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof BadgeTag> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Sustainable|Limited edition/),
    ).toBeInTheDocument();
  },
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
