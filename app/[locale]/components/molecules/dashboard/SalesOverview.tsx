'use client';

import { useTranslations } from 'next-intl';
import type { RecentOrder } from '@hooks/domains/dashboard';
import { formatMoney } from '@lib/utils/money';
import { Badge } from '@shadcn/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('Dashboard');
  let label = status;

  let variant: 'outline' | 'secondary' | 'destructive' = 'outline';
  switch (status) {
    case 'PROCESSING':
      label = t('processing');
      break;
    case 'CONFIRMED':
      label = t('confirmed');
      break;
    case 'SHIPPED':
      label = t('shipped');
      break;
    case 'COMPLETED':
      variant = 'secondary';
      label = t('completed');
      break;
    case 'CANCELLED':
      variant = 'destructive';
      label = t('cancelled');
      break;
  }
  return <Badge variant={variant}>{label}</Badge>;
}

/** Column headers shared with the loading skeleton. */
export function SalesOverviewHeader() {
  const t = useTranslations('Dashboard');

  return (
    <TableHeader>
      <TableRow>
        <TableHead scope="col">{t('order')}</TableHead>
        <TableHead scope="col">{t('date')}</TableHead>
        <TableHead scope="col">{t('customer')}</TableHead>
        <TableHead scope="col">{t('total')}</TableHead>
        <TableHead scope="col">{t('status')}</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface SalesOverviewProps {
  recentOrders: RecentOrder[];
  locale: string;
}

export default function SalesOverview({
  recentOrders,
  locale,
}: SalesOverviewProps) {
  const t = useTranslations('Dashboard');

  return (
    <section aria-labelledby="sales-overview-heading">
      <h2
        id="sales-overview-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('salesOverview')}
      </h2>

      <Table aria-label={t('salesOverview')}>
        <SalesOverviewHeader />
        <TableBody>
          {recentOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>{t('noRecentOrders')}</TableCell>
            </TableRow>
          ) : (
            recentOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{formatMoney(order.orderTotal, locale)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.orderStatus} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
