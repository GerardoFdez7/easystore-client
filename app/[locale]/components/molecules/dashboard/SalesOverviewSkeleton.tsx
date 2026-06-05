import { Skeleton } from '@shadcn/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';

export default function SalesOverviewSkeleton() {
  return (
    <>
      <Skeleton className="mb-4 h-8 w-40" />

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <Table className="bg-card min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground text-sm font-semibold sm:pl-5">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                <Skeleton className="h-4 w-12" />
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                <Skeleton className="h-4 w-14" />
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-sm sm:pl-5">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-sm">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="text-sm">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="text-sm">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
