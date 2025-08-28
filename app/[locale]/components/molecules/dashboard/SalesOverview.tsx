'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/[locale]/components/shadcn/ui/table';
import { useTranslations } from 'next-intl';

const orders = [
  {
    order: 'ORD-001',
    date: '2024-06-01',
    customer: 'Alice Johnson',
    total: '$120.00',
    status: 'PROCESSING',
  },
  {
    order: 'ORD-002',
    date: '2024-06-02',
    customer: 'Bob Smith',
    total: '$80.00',
    status: 'CONFIRMED',
  },
  {
    order: 'ORD-003',
    date: '2024-06-03',
    customer: 'Charlie Brown',
    total: '$150.00',
    status: 'SHIPPED',
  },
  {
    order: 'ORD-004',
    date: '2024-06-04',
    customer: 'Diana Prince',
    total: '$200.00',
    status: 'COMPLETED',
  },
  {
    order: 'ORD-005',
    date: '2024-06-05',
    customer: 'Eve Adams',
    total: '$95.00',
    status: 'CANCELLED',
  },
];

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

export default function SalesOverview() {
  const t = useTranslations('Dashboard');

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
            {orders.map((order) => (
              <TableRow key={order.order} className="hover:bg-hover transition">
                <TableCell className="font-mono text-sm sm:pl-5">
                  {order.order}
                </TableCell>
                <TableCell className="text-sm">{order.date}</TableCell>
                <TableCell className="text-sm">{order.customer}</TableCell>
                <TableCell className="text-sm">{order.total}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
