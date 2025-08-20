import type { Meta, StoryObj } from '@storybook/nextjs';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

const meta: Meta<typeof LanguageButton> = {
  title: 'Atoms/Shared/LanguageButton',
  parameters: {
    layout: 'centered',
  },
  component: LanguageButton,
};

export default meta;

type Story = StoryObj<typeof LanguageButton>;

export const Default: Story = {};
