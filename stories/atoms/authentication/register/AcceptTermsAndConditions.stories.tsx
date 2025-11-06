import type { Meta, StoryObj } from '@storybook/nextjs';
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

export const Default: Story = {};
