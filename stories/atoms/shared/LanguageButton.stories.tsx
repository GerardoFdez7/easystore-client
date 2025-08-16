import type { Meta, StoryObj } from '@storybook/react';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

const meta: Meta<typeof LanguageButton> = {
  title: 'Atoms/Shared/LanguageButton',
  component: LanguageButton,
};

export default meta;

type Story = StoryObj<typeof LanguageButton>;

export const Default: Story = {};
