import type { Meta, StoryObj } from '@storybook/nextjs';
import MainProfile from '@organisms/profile/MainProfile';
import { MockedProvider } from '@apollo/client/testing/react';
import { FindTenantProfileDocument } from '@graphql/generated';

const meta: Meta<typeof MainProfile> = {
  component: MainProfile,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  title: 'Organisms/Profile/MainProfile',
};

export default meta;

type Story = StoryObj<typeof MainProfile>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FindTenantProfileDocument,
            },
            delay: Infinity, // This will keep the query in loading state
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};
