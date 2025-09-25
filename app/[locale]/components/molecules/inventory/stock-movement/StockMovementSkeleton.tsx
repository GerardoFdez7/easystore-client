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

interface StockMovementSkeletonProps {
  className?: string;
  rows?: number;
}

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
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader className="text-lg">
          <TableRow>
            <TableHead className="pl-2">
              <Skeleton className="h-4 w-4 rounded-none" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-28" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-4 rounded-none" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
