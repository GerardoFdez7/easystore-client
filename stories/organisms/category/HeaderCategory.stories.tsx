import type { Meta, StoryObj } from '@storybook/react';
import HeaderCategory from '@organisms/category/HeaderCategory';

const meta: Meta<typeof HeaderCategory> = {
  title: 'Organisms/Category/HeaderCategory',
  component: HeaderCategory,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '120px', background: 'var(--background)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HeaderCategory>;
export const Default: Story = {};
