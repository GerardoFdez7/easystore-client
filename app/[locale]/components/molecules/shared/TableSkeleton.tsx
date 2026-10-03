import { Skeleton } from '@shadcn/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { cn } from '@lib/utils';

interface SkeletonGroupSpec {
  className?: string;
  skeletonClassNames: readonly string[];
}

export interface TableSkeletonCellSpec {
  className?: string;
  contentClassName?: string;
  groups: readonly SkeletonGroupSpec[];
}

export interface TableSkeletonColumnSpec {
  header: TableSkeletonCellSpec;
  body: TableSkeletonCellSpec;
}

interface SkeletonCellOptions {
  cellClassName?: string;
  wrapperClassName?: string;
}

interface GroupedSkeletonCellOptions {
  cellClassName?: string;
  contentClassName?: string;
}

interface TableSkeletonProps {
  className?: string;
  columns: readonly TableSkeletonColumnSpec[];
  headerClassName?: string;
  rowClassName?: string;
  rows: number;
}

export const skeletonCell = (
  skeletonClassName: string,
  options: SkeletonCellOptions = {},
): TableSkeletonCellSpec => ({
  className: options.cellClassName,
  groups: [
    {
      className: options.wrapperClassName,
      skeletonClassNames: [skeletonClassName],
    },
  ],
});

export const stackedSkeletonCell = (
  skeletonClassNames: readonly string[],
  options: SkeletonCellOptions = {},
): TableSkeletonCellSpec => ({
  className: options.cellClassName,
  groups: [
    {
      className: options.wrapperClassName,
      skeletonClassNames,
    },
  ],
});

export const groupedSkeletonCell = (
  groups: readonly SkeletonGroupSpec[],
  options: GroupedSkeletonCellOptions = {},
): TableSkeletonCellSpec => ({
  className: options.cellClassName,
  contentClassName: options.contentClassName,
  groups,
});

function SkeletonGroup({ className, skeletonClassNames }: SkeletonGroupSpec) {
  const skeletons = skeletonClassNames.map((skeletonClassName, index) => (
    <Skeleton
      key={`${skeletonClassName}-${index}`}
      className={skeletonClassName}
    />
  ));

  return className ? <div className={className}>{skeletons}</div> : skeletons;
}

function SkeletonCellContent({
  contentClassName,
  groups,
}: Pick<TableSkeletonCellSpec, 'contentClassName' | 'groups'>) {
  const content = groups.map((group, index) => (
    <SkeletonGroup key={index} {...group} />
  ));

  return contentClassName ? (
    <div className={contentClassName}>{content}</div>
  ) : (
    content
  );
}

function TablePaginationSkeleton() {
  return (
    <div className="text-muted-foreground mt-4 flex items-center justify-between px-2 text-left">
      <div className="flex-1 text-left">
        <Skeleton className="h-4 w-32 md:w-40" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="hidden items-center space-x-2 md:flex">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
        <div className="flex items-center space-x-2 md:hidden">
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TableSkeleton({
  className,
  columns,
  headerClassName,
  rowClassName,
  rows,
}: TableSkeletonProps) {
  return (
    <div className={cn('w-full', className)}>
      <Table aria-hidden="true">
        <TableHeader className={headerClassName}>
          <TableRow className={rowClassName}>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.header.className}>
                <SkeletonCellContent {...column.header} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <TableRow key={rowIndex} className={rowClassName}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} className={column.body.className}>
                  <SkeletonCellContent {...column.body} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePaginationSkeleton />
    </div>
  );
}
