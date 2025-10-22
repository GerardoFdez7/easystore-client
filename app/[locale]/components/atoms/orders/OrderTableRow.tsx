'use client';

import { TableCell, TableRow } from '@shadcn/ui/table';
import { useRouter } from 'next/navigation';
import { Order } from '@lib/types/order';
import OrderStatus from '@atoms/orders/OrderStatus';

interface OrderTableRowProps {
  order: Order;
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/orders/${order.id}`);
  };

  const formatCurrency = (amount: number) => {
    const symbol = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TableRow className="cursor-pointer" onClick={handleRowClick}>
      <TableCell>
        <span className="font-mono font-medium">{order.orderNumber}</span>
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell>{formatCurrency(order.total)}</TableCell>
      <TableCell className="uppercase">{order.currency}</TableCell>
      <TableCell>{order.shippingMethod || '-'}</TableCell>
      <TableCell>{order.customer.name}</TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>
    </TableRow>
  );
}
