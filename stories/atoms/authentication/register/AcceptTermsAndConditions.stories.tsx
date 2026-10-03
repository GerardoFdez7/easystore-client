import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AcceptTermsAndConditions from '@atoms/authentication/register/AcceptTermsAndConditions';

const meta: Meta<typeof AcceptTermsAndConditions> = {
  title: 'Atoms/Authentication/Register/AcceptTermsAndConditions',
  parameters: {
    layout: 'centered',
  },
  component: AcceptTermsAndConditions,
};

export default meta;

type Story = StoryObj<typeof AcceptTermsAndConditions>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('link', { name: 'Terms and Conditions' }),
    ).toHaveAttribute('href', '/terms');
    await storybookExpect(
      canvas.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy');
    await storybookExpect(
      canvas.getByText(/By continuing, you accept the/),
    ).toBeVisible();
  },
};
