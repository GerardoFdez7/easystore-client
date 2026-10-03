import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TableSkeleton, {
  skeletonCell,
  stackedSkeletonCell,
  type TableSkeletonColumnSpec,
} from '@molecules/shared/TableSkeleton';

const columns: readonly TableSkeletonColumnSpec[] = [
  {
    header: skeletonCell('h-4 w-24'),
    body: stackedSkeletonCell(['h-4 w-32', 'h-3 w-24'], {
      wrapperClassName: 'flex flex-col gap-1',
    }),
  },
  {
    header: skeletonCell('h-4 w-16', {
      cellClassName: 'text-center',
      wrapperClassName: 'flex justify-center',
    }),
    body: skeletonCell('h-4 w-20', {
      cellClassName: 'text-center',
      wrapperClassName: 'flex justify-center',
    }),
  },
];

const meta: Meta<typeof TableSkeleton> = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getAllByRole('row', { hidden: true }),
    ).toHaveLength(args.rows + 1);
  },
  title: 'Molecules/Shared/TableSkeleton',
  component: TableSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional classes applied to the table container.',
    },
    rows: {
      control: { type: 'number', min: 1, max: 25 },
      description: 'Number of placeholder rows displayed.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableSkeleton>;

export const Default: Story = {
  args: {
    columns,
    rows: 5,
  },
  render: (args) => (
    <div className="w-160">
      <TableSkeleton {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    columns,
    rows: 2,
  },
  render: (args) => (
    <div className="w-160">
      <TableSkeleton {...args} />
    </div>
  ),
};
