import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PreviewTemplate from '@templates/Preview';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Preview' }),
    ).toBeInTheDocument();
  },
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
