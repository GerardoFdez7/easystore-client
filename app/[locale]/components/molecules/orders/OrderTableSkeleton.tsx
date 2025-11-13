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

interface OrderTableSkeletonProps {
  className?: string;
  rows?: number;
}

/**
 * OrderTableSkeleton - A skeleton component that matches the OrderTable structure
 * Shows skeleton rows with the same column layout as the actual table
 *
 * @param className - Additional CSS classes
 * @param rows - Number of skeleton rows to display (default: 25)
 */
export default function OrderTableSkeleton({
  className,
  rows = 25,
}: OrderTableSkeletonProps) {
  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-28" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index} className="hover:bg-background">
              {/* Order Number */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              {/* Status */}
              <TableCell>
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              {/* Total */}
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              {/* Currency */}
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              {/* Shipping Method */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              {/* Customer */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              {/* Date */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
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
