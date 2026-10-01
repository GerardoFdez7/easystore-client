import TableSkeleton, {
  skeletonCell,
  stackedSkeletonCell,
  type TableSkeletonColumnSpec,
} from '@molecules/shared/TableSkeleton';

interface InventoryTableSkeletonProps {
  className?: string;
  rows?: number;
}

const centeredHeader = {
  cellClassName: 'text-center',
  wrapperClassName: 'flex items-center justify-center',
};

const centeredBody = {
  cellClassName: 'text-center',
  wrapperClassName: 'flex justify-center',
};

const columns: readonly TableSkeletonColumnSpec[] = [
  {
    header: skeletonCell('h-4 w-4 rounded-none', { cellClassName: 'pl-2' }),
    body: skeletonCell('h-4 w-4 rounded-none'),
  },
  {
    header: skeletonCell('h-4 w-20', centeredHeader),
    body: stackedSkeletonCell(['h-4 w-32', 'h-4 w-24'], {
      wrapperClassName: 'flex flex-col gap-1',
    }),
  },
  {
    header: skeletonCell('h-4 w-12'),
    body: skeletonCell('h-4 w-20'),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-12', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-12', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-32', centeredHeader),
    body: skeletonCell('h-4 w-20', centeredBody),
  },
];

/**
 * InventoryTableSkeleton - A skeleton component that matches the InventoryTable structure
 * Shows skeleton rows with the same column layout as the actual table
 *
 * @param className - Additional CSS classes
 * @param rows - Number of skeleton rows to display (default: 25)
 */
export default function InventoryTableSkeleton({
  className,
  rows = 25,
}: InventoryTableSkeletonProps) {
  return (
    <TableSkeleton
      className={className}
      columns={columns}
      headerClassName="text-lg"
      rows={rows}
    />
  );
}
