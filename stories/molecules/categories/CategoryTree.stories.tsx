import type { Meta, StoryObj } from '@storybook/react';
import CategoryTree from '@molecules/categories/CategoryTree';

const meta: Meta<typeof CategoryTree> = {
  title: 'Molecules/Category/CategoryTree',
  component: CategoryTree,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#f3f4f6', width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryTree>;
export const Default: Story = {};
