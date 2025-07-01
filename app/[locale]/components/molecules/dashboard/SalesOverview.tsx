'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/[locale]/components/shadcn/ui/table';

const orders = [
  {
    order: 'ORD-001',
    date: '2024-06-01',
    customer: 'Alice Johnson',
    total: '$120.00',
    status: 'Paid',
  },
  {
    order: 'ORD-002',
    date: '2024-06-02',
    customer: 'Bob Smith',
    total: '$80.00',
    status: 'Pending',
  },
  {
    order: 'ORD-003',
    date: '2024-06-03',
    customer: 'Charlie Brown',
    total: '$150.00',
    status: 'Paid',
  },
  {
    order: 'ORD-004',
    date: '2024-06-04',
    customer: 'Diana Prince',
    total: '$200.00',
    status: 'Cancelled',
  },
  {
    order: 'ORD-005',
    date: '2024-06-05',
    customer: 'Eve Adams',
    total: '$95.00',
    status: 'Paid',
  },
];

function StatusBadge({ status }: { status: string }) {
  let color = 'bg-foreground';
  if (status === 'Paid') color = 'bg-green-100 text-green-700';
  if (status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
  if (status === 'Cancelled') color = 'bg-red-100 text-red-700';
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default function SalesOverview() {
  return (
    <>
      <h1 className="text-title mb-4 text-2xl font-bold">Sales Overview</h1>

      <div className="overflow-x-auto rounded-lg border border-[#e2e8f0] bg-white shadow-lg">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground text-sm font-semibold sm:pl-5">
                Order
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                Date
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                Customer
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                Total
              </TableHead>
              <TableHead className="text-foreground text-sm font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order}
                className="hover:bg-background transition"
              >
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
