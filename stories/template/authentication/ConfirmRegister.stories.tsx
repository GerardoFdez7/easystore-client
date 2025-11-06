import type { Meta, StoryObj } from '@storybook/nextjs';
import ConfirmRegisterPage from '@templates/authentication/ConfirmRegister';

const meta: Meta<typeof ConfirmRegisterPage> = {
  title: 'Templates/Authentication/ConfirmRegister',
  component: ConfirmRegisterPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ConfirmRegisterPage>;

export const Default: Story = {};
