'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { OrderTableRow } from '@atoms/orders/OrderTableRow';
import { useTranslations } from 'next-intl';
import { Order } from '@lib/types/order';
import TablePagination from '@molecules/shared/TablePagination';

interface OrderTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export function OrderTable({
  orders,
  currentPage,
  totalPages,
  totalRows,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  canPreviousPage,
  canNextPage,
}: OrderTableProps) {
  const t = useTranslations('Orders');

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead>{t('order')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('total')}</TableHead>
            <TableHead>{t('currency')}</TableHead>
            <TableHead>{t('shippingMethod')}</TableHead>
            <TableHead>{t('customer')}</TableHead>
            <TableHead>{t('date')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderTableRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCount={0}
        totalRows={totalRows}
        onPageChange={onPageChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </>
  );
}
