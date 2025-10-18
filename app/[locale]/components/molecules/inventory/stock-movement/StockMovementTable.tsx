'use client';

import { useState } from 'react';
import { Button } from '@shadcn/ui/button';
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
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';

// Define the stock movement item type
type StockMovementItem = {
  id: string;
  productName: string;
  variantSku?: string;
  deltaQuantity: number;
  reason: string;
  createdBy: string;
  date: string;
};

type StockMovementTableProps = {
  className?: string;
  stockMovements: StockMovementItem[];
  onCreateMovement?: () => void;
};

export default function StockMovementTable({
  className,
  stockMovements,
  onCreateMovement,
}: StockMovementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const t = useTranslations('StockMovement');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockMovements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stockMovements.length / itemsPerPage);

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
        <TableHeader className="text-lg">
          <TableRow>
            <TableHead>{t('productTableHead')}</TableHead>
            <TableHead>{t('skuTableHead')}</TableHead>
            <TableHead>{t('deltaQuantityTableHead')}</TableHead>
            <TableHead>{t('reasonTableHead')}</TableHead>
            <TableHead>{t('createdByTableHead')}</TableHead>
            <TableHead>{t('dateTableHead')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-start font-medium">
                    {item.productName}
                  </span>
                </div>
              </TableCell>
              <TableCell>{item.variantSku || '-'}</TableCell>
              <TableCell>
                <span
                  className={
                    item.deltaQuantity >= 0 ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {item.deltaQuantity >= 0 ? '+' : ''}
                  {item.deltaQuantity}
                </span>
              </TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.createdBy ? item.createdBy : '-'}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {t('previousButton')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {t('nextButton')}
        </Button>
      </div>
    </div>
  );
}
