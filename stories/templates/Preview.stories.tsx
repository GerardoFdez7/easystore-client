import type { Meta, StoryObj } from '@storybook/nextjs';
import PreviewTemplate from '@templates/Preview';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  title: 'Templates/Preview',
  component: PreviewTemplate,
  decorators: [withCountdown],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Store preview workspace template with authenticated navigation and its current construction state.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnderConstruction: Story = {};
