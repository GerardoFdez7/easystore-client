import TableSkeleton, {
  groupedSkeletonCell,
  skeletonCell,
  type TableSkeletonColumnSpec,
} from '@molecules/shared/TableSkeleton';

interface ProductTableSkeletonProps {
  className?: string;
  rows?: number;
}

const centeredHeader = {
  cellClassName: 'text-center',
  wrapperClassName: 'flex items-center justify-center',
};

const centeredBody = {
  cellClassName: 'text-center',
  wrapperClassName: 'flex items-center justify-center',
};

const columns: readonly TableSkeletonColumnSpec[] = [
  {
    header: skeletonCell('h-4 w-4 rounded-none', { cellClassName: 'pl-2' }),
    body: skeletonCell('h-4 w-4 rounded-none', { cellClassName: 'pl-2' }),
  },
  {
    header: skeletonCell('h-4 w-28'),
    body: groupedSkeletonCell(
      [
        { skeletonClassNames: ['h-10 w-10 rounded-md'] },
        {
          className: 'flex flex-col gap-1',
          skeletonClassNames: ['h-4 w-32', 'h-3 w-24'],
        },
      ],
      { contentClassName: 'flex items-center gap-3' },
    ),
  },
  {
    header: skeletonCell('h-4 w-16', centeredHeader),
    body: skeletonCell('h-4 w-20', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-20', centeredHeader),
    body: skeletonCell('h-4 w-16', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-8', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-24', centeredHeader),
    body: skeletonCell('h-4 w-24', centeredBody),
  },
  {
    header: skeletonCell('h-4 w-20', centeredHeader),
    body: skeletonCell('h-5 w-16 rounded-full', centeredBody),
  },
];

/**
 * ProductTableSkeleton - A skeleton component that matches the ProductTable structure
 * Shows skeleton rows with the same column layout as the actual table
 *
 * @param className - Additional CSS classes
 * @param rows - Number of skeleton rows to display (default: 25)
 */
export default function ProductTableSkeleton({
  className,
  rows = 25,
}: ProductTableSkeletonProps) {
  return (
    <TableSkeleton
      className={className}
      columns={columns}
      rowClassName="hover:bg-background"
      rows={rows}
    />
  );
}
