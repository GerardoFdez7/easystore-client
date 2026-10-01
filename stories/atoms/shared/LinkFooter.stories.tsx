import LinkFooter from '@atoms/shared/LinkFooter';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof LinkFooter> = {
  title: 'Atoms/Shared/LinkFooter',
  component: LinkFooter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Destination passed to the Next.js link.',
    },
    text: {
      control: 'text',
      description: 'Visible footer-link label.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkFooter>;

export const Default: Story = {
  args: {
    href: '/en/privacy',
    text: 'Privacy policy',
  },
};
