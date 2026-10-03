import TableSkeleton, {
  skeletonCell,
  stackedSkeletonCell,
  type TableSkeletonColumnSpec,
} from '@molecules/shared/TableSkeleton';

interface StockMovementSkeletonProps {
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
    header: skeletonCell('h-4 w-28', {
      cellClassName: 'flex items-center justify-center',
    }),
    body: stackedSkeletonCell(['h-4 w-32', 'h-3 w-24'], {
      wrapperClassName: 'flex flex-col gap-1',
    }),
  },
  {
    header: skeletonCell('h-4 w-16', centeredHeader),
    body: skeletonCell('h-4 w-24', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-30', centeredHeader),
    body: skeletonCell('h-4 w-16', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-64', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-14', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-20', centeredHeader),
    body: skeletonCell('h-4 w-24', centeredBody),
  },
];

/**
 * StockMovementSkeleton - A skeleton component that matches the StockMovementTable structure
 * Shows skeleton rows with the same column layout as the actual table
 *
 * @param className - Additional CSS classes
 * @param rows - Number of skeleton rows to display (default: 25)
 */
export default function StockMovementSkeleton({
  className,
  rows = 25,
}: StockMovementSkeletonProps) {
  return (
    <TableSkeleton
      className={className}
      columns={columns}
      rowClassName="hover:bg-background"
      rows={rows}
    />
  );
}
