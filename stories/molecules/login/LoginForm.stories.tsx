import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginForm from '@molecules/login/LoginForm';
import { AccountTypeEnum } from '@graphql/generated';

const meta = {
  title: 'Molecules/Login/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    accountType: {
      control: 'select',
      options: Object.values(AccountTypeEnum),
      description: 'The type of account for login',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="flex min-h-full items-center justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accountType: AccountTypeEnum.Tenant,
  },
};

export const TenantLogin: Story = {
  args: {
    accountType: AccountTypeEnum.Tenant,
  },
};

export const OwnerLogin: Story = {
  args: {
    accountType: AccountTypeEnum.Tenant,
  },
};

export const InCard: Story = {
  args: {
    accountType: AccountTypeEnum.Tenant,
  },
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-2xl font-bold">
              Welcome Back
            </h1>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    accountType: AccountTypeEnum.Tenant,
  },
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-sm">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};
