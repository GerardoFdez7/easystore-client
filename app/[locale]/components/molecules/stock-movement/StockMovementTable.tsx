'use client';

import { useState } from 'react';
import { Checkbox } from '@shadcn/ui/checkbox';
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
  movementType: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason: string;
  date: string;
  location?: string;
  reference?: string;
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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const t = useTranslations('StockMovement');

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? stockMovements.map((item) => item.id) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockMovements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stockMovements.length / itemsPerPage);

  // Get movement type styling
  const getMovementTypeStyle = (type: string) => {
    switch (type) {
      case 'IN':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'OUT':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'ADJUSTMENT':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

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
            <TableHead className="pl-2">
              <Checkbox
                checked={selectedRows.length === stockMovements.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>{t('productTableHead')}</TableHead>
            <TableHead>{t('skuTableHead')}</TableHead>
            <TableHead>{t('movementTypeTableHead')}</TableHead>
            <TableHead>{t('quantityTableHead')}</TableHead>
            <TableHead>{t('reasonTableHead')}</TableHead>
            <TableHead>{t('locationTableHead')}</TableHead>
            <TableHead>{t('dateTableHead')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(item.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-start font-medium">
                    {item.productName}
                  </span>
                  {item.reference && (
                    <span className="text-start text-sm text-gray-500">
                      Ref: {item.reference}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{item.variantSku || '-'}</TableCell>
              <TableCell>
                <span className={getMovementTypeStyle(item.movementType)}>
                  {item.movementType}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={
                    item.movementType === 'IN'
                      ? 'font-medium text-green-600'
                      : item.movementType === 'OUT'
                        ? 'font-medium text-red-600'
                        : 'font-medium text-blue-600'
                  }
                >
                  {item.movementType === 'IN'
                    ? '+'
                    : item.movementType === 'OUT'
                      ? '-'
                      : '±'}
                  {item.quantity}
                </span>
              </TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.location || '-'}</TableCell>
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
