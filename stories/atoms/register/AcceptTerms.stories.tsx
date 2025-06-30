import type { Meta, StoryObj } from '@storybook/react';
import AcceptTermsAndConditions from '@atoms/register/AcceptTermsAndConditions';

const meta: Meta<typeof AcceptTermsAndConditions> = {
  title: 'Atoms/Register/AcceptTermsAndConditions',
  component: AcceptTermsAndConditions,
  parameters: {
    nextIntl: {
      messages: {
        Register: {
          termsMessage: 'By registering, you agree to our',
          termsAndConditions: 'Terms & Conditions',
          and: 'and',
          privacyPolicy: 'Privacy Policy',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AcceptTermsAndConditions>;

export const Default: Story = {
  render: () => <AcceptTermsAndConditions />,
};
