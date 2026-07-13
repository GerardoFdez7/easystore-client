'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { useTranslations } from 'next-intl';
import type { RecentOrder } from '@hooks/domains/dashboard';

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('Dashboard');
  let label = status;

  let color = 'bg-foreground';
  switch (status) {
    case 'PROCESSING':
      color = 'bg-yellow-100 text-yellow-700';
      label = t('processing');
      break;
    case 'CONFIRMED':
      color = 'bg-blue-100 text-blue-700';
      label = t('confirmed');
      break;
    case 'SHIPPED':
      color = 'bg-purple-100 text-purple-700';
      label = t('shipped');
      break;
    case 'COMPLETED':
      color = 'bg-green-100 text-green-700';
      label = t('completed');
      break;
    case 'CANCELLED':
      color = 'bg-red-100 text-red-700';
      label = t('cancelled');
      break;
    default:
      color = 'bg-gray-100 text-gray-700';
  }
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}

interface SalesOverviewProps {
  recentOrders: RecentOrder[];
}

export default function SalesOverview({ recentOrders }: SalesOverviewProps) {
  const t = useTranslations('Dashboard');
  const currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';

  return (
    <>
      <h1 className="text-title mb-4 text-2xl font-bold">
        {t('salesOverview')}
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <Table className="bg-card min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground text-sm font-semibold sm:pl-5">
                {t('order')}
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                {t('date')}
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                {t('customer')}
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                {t('total')}
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                {t('status')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <span className="text-muted-foreground">
                    {t('noRecentOrders')}
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              recentOrders.map((order) => (
                <TableRow
                  key={order.orderId}
                  className="hover:bg-hover transition"
                >
                  <TableCell className="font-mono text-sm sm:pl-5">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-sm">
                    {currency}
                    {order.orderTotal.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.orderStatus} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
