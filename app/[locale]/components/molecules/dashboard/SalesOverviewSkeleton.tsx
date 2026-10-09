import { useTranslations } from 'next-intl';
import { Skeleton } from '@shadcn/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@shadcn/ui/table';
import { SalesOverviewHeader } from './SalesOverview';

export default function SalesOverviewSkeleton() {
  const t = useTranslations('Dashboard');

  return (
    <section aria-labelledby="sales-overview-heading" aria-busy="true">
      <h2
        id="sales-overview-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('salesOverview')}
      </h2>

      <div aria-hidden="true">
        <Table>
          <SalesOverviewHeader />
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-6 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
