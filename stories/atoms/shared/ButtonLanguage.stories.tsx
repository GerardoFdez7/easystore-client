import { expect as storybookExpect, within } from 'storybook/test';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof LanguageButton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Languages' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/ButtonLanguage',
  component: LanguageButton,
  parameters: {
    layout: 'centered',
    nextjs: {
      navigation: {
        pathname: '/en/dashboard',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LanguageButton>;

export const Default: Story = {};
