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
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="flex items-center justify-center">
              <Skeleton className="h-4 w-28" />
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-16" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-30" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-24" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-24" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index} className="hover:bg-background">
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-64" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-14" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* TablePagination Skeleton */}
      <div className="text-muted-foreground mt-4 flex items-center justify-between px-2 text-left">
        {/* Left side - Page info skeleton */}
        <div className="flex-1 text-left">
          <Skeleton className="h-4 w-32 md:w-40" />
        </div>

        {/* Right side - Pagination buttons skeleton */}
        <div className="flex items-center space-x-2">
          {/* Desktop: Show all 4 buttons */}
          <div className="hidden items-center space-x-2 md:flex">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>

          {/* Mobile: Show only 2 buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
