'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { cn, formatDate } from '@lib/utils';
import { Package, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import { Separator } from '@shadcn/ui/separator';
import EmptyState from '@molecules/shared/EmptyState';
import TablePagination from '@molecules/shared/TablePagination';
import { useTranslations } from 'next-intl';

// Define the stock movement item type
type StockMovementItem = {
  id: string;
  productName: string;
  variantSku?: string;
  variantFirstAttribute?: { key: string; value: string };
  deltaQuantity: number;
  reason: string;
  createdBy: string;
  date: string;
};

type StockMovementTableProps = {
  className?: string;
  stockMovements: StockMovementItem[];
  onCreateMovement?: () => void;
  currentPage: number;
  totalPages: number;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export default function StockMovementTable({
  className,
  stockMovements,
  onCreateMovement,
  currentPage,
  totalPages,
  totalRows,
  onPageChange,
}: StockMovementTableProps) {
  const t = useTranslations('StockMovement');

  // Show empty state if no stock movement items
  if (stockMovements.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <EmptyState
          icon={Package}
          title={t('noStockMovementsFound')}
          description={t('emptyStateDescription')}
          buttonText={t('addMovementButton')}
          buttonIcon={Plus}
          onButtonClick={() => onCreateMovement?.()}
        />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead>{t('productTableHead')}</TableHead>
            <TableHead>{t('skuTableHead')}</TableHead>
            <TableHead>{t('deltaQuantityTableHead')}</TableHead>
            <TableHead>{t('reasonTableHead')}</TableHead>
            <TableHead>{t('createdByTableHead')}</TableHead>
            <TableHead>{t('dateTableHead')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockMovements.map((item) => (
            <TableRow key={item.id} className="hover:bg-background">
              <TableCell>
                <div className="flex flex-col">
                  {item.variantFirstAttribute && (
                    <span className="text-start font-medium">
                      {item.variantFirstAttribute.key}:{' '}
                      {item.variantFirstAttribute.value}
                    </span>
                  )}
                  <span className="text-start">{item.productName}</span>
                </div>
              </TableCell>
              <TableCell>{item.variantSku || '-'}</TableCell>
              <TableCell>
                <span
                  className={
                    item.deltaQuantity > 0
                      ? 'text-secondary'
                      : item.deltaQuantity < 0
                        ? 'text-error'
                        : ''
                  }
                >
                  {item.deltaQuantity > 0 ? '+' : ''}
                  {item.deltaQuantity}
                </span>
              </TableCell>
              <TableCell>
                {item.reason ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="max-w-sm cursor-pointer truncate text-left underline-offset-2 hover:underline">
                        {item.reason.length > 80
                          ? `${item.reason.slice(0, 80)}…`
                          : item.reason}
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('reasonDetailsTitle')}</DialogTitle>
                        <DialogDescription>
                          {t('reasonDetailsDescription')}
                        </DialogDescription>
                      </DialogHeader>
                      <Separator />
                      <div className="overflow-y-auto wrap-break-word whitespace-pre-wrap">
                        {item.reason}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                {item.createdBy ? item.createdBy : t('you')}
              </TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCount={0}
        totalRows={totalRows}
        onPageChange={onPageChange}
        onPreviousPage={() => onPageChange(Math.max(currentPage - 1, 1))}
        onNextPage={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        onFirstPage={() => onPageChange(1)}
        onLastPage={() => onPageChange(totalPages)}
        canPreviousPage={currentPage > 1}
        canNextPage={currentPage < totalPages}
      />
    </div>
  );
}
