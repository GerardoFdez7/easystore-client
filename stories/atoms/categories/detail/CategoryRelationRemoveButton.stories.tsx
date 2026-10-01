import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryRelationRemoveButton from '@atoms/categories/detail/CategoryRelationRemoveButton';

const meta = {
  title: 'Atoms/Categories/Detail/CategoryRelationRemoveButton',
  component: CategoryRelationRemoveButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    categoryName: 'Accessories',
    containerClassName: 'flex items-center justify-end',
    tooltip: 'Remove relation',
    onRemove: () => undefined,
  },
  argTypes: {
    categoryName: { description: 'Category named by the remove action.' },
    disabled: { control: 'boolean' },
    containerClassName: { control: false },
    tooltip: { control: false },
    onRemove: { control: false },
  },
  decorators: [
    (Story) => (
      <div>
        <span id="category-name-Accessories">Accessories</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryRelationRemoveButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
