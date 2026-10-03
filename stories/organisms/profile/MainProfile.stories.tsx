import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileDraftProvider } from '@contexts/ProfileDraftContext';
import MainProfile from '@organisms/profile/MainProfile';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { FindTenantProfileDocument } from '@graphql/generated';

const meta: Meta<typeof MainProfile> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Change password' }),
    ).toBeInTheDocument();
  },
  component: MainProfile,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  title: 'Organisms/Profile/MainProfile',
  decorators: [
    (Story) => (
      <ProfileDraftProvider>
        <Story />
      </ProfileDraftProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MainProfile>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <ApolloMswMocks
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
      </ApolloMswMocks>
    ),
  ],
};
