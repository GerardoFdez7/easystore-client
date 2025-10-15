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

interface InventoryTableSkeletonProps {
  className?: string;
  rows?: number;
}

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
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader className="text-lg">
          <TableRow>
            <TableHead className="pl-2">
              <Skeleton className="h-4 w-4 rounded-none" />
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-12" />
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
                <Skeleton className="h-4 w-32" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-4 rounded-none" />
              </TableCell>
              {/* Product and variant */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              {/* SKU */}
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              {/* Available */}
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-12" />
                </div>
              </TableCell>
              {/* Reserved */}
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-12" />
                </div>
              </TableCell>
              {/* Replenishment Date */}
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-20" />
                </div>
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
