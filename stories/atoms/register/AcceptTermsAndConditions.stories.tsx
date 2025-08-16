import type { Meta, StoryObj } from '@storybook/react';
import AcceptTermsAndConditions from '@atoms/register/AcceptTermsAndConditions';

const meta: Meta<typeof AcceptTermsAndConditions> = {
  title: 'Atoms/Register/AcceptTermsAndConditions',
  component: AcceptTermsAndConditions,
};

export default meta;

type Story = StoryObj<typeof AcceptTermsAndConditions>;

export const Default: Story = {};
