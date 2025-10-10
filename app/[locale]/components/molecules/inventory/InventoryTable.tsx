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
import { FindInventoryQueryVariables } from '@graphql/generated';
import { InventoryItem } from '@lib/types/inventory';
import {
  Package,
  Plus,
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ClockArrowUp,
  ClockArrowDown,
} from 'lucide-react';
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';

type SortField = 'available' | 'reserved' | 'date' | 'variantFirstAttribute';
type SortDirection = 'ASC' | 'DESC';

type InventoryTableProps = {
  variables: FindInventoryQueryVariables;
  className?: string;
  inventory: InventoryItem[];
  onCreateStock?: () => void;
  onSortChange?: (field: SortField, direction: SortDirection) => void;
  sortField?: SortField | null;
  sortDirection?: SortDirection;
};

export default function InventoryTable({
  className,
  inventory,
  onCreateStock,
  onSortChange,
  sortField: externalSortField,
  sortDirection: externalSortDirection,
}: InventoryTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sortField = externalSortField ?? 'variantFirstAttribute';
  const sortDirection = externalSortDirection ?? 'ASC';
  const itemsPerPage = 25;
  const t = useTranslations('Inventory');

  const handleSort = (field: SortField) => {
    let newDirection: SortDirection = 'ASC';

    if (sortField === field) {
      newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }

    onSortChange?.(field, newDirection);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }

    // Determine if field is numeric, text-based, or date-based
    const isNumericField = field === 'available' || field === 'reserved';
    const isDateField = field === 'date';

    if (isDateField) {
      return sortDirection === 'ASC' ? (
        <ClockArrowDown className="ml-1 h-4 w-4" />
      ) : (
        <ClockArrowUp className="ml-1 h-4 w-4" />
      );
    } else if (isNumericField) {
      return sortDirection === 'ASC' ? (
        <ArrowDown01 className="ml-1 h-4 w-4" />
      ) : (
        <ArrowDown10 className="ml-1 h-4 w-4" />
      );
    } else {
      return sortDirection === 'ASC' ? (
        <ArrowDownAZ className="ml-1 h-4 w-4" />
      ) : (
        <ArrowDownZA className="ml-1 h-4 w-4" />
      );
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? inventory.map((item) => item.id) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  // Show empty state if no inventory items
  if (inventory.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title={t('noProductVariantsFound')}
        description={t('emptyStateDescription')}
        buttonText={t('addStockButton')}
        buttonIcon={Plus}
        onButtonClick={() => onCreateStock?.()}
      />
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-2">
              <Checkbox
                checked={selectedRows.length === inventory.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('variantFirstAttribute')}
            >
              <div className="flex items-center justify-center">
                {t('productTableHead')}
                {getSortIcon('variantFirstAttribute')}
              </div>
            </TableHead>
            <TableHead>{t('skuTableHead')}</TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('available')}
            >
              <div className="flex items-center justify-center">
                {t('availableTableHead')}
                {getSortIcon('available')}
              </div>
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('reserved')}
            >
              <div className="flex items-center justify-center">
                {t('reservedTableHead')}
                {getSortIcon('reserved')}
              </div>
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center justify-center">
                {t('replenishmentDateTableHead')}
                {getSortIcon('date')}
              </div>
            </TableHead>
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
                    {item.variantFirstAttribute.key}:{' '}
                    {item.variantFirstAttribute.value}
                  </span>
                  <span className="text-start">{item.productName}</span>
                </div>
              </TableCell>
              <TableCell>{item.variantSku || '-'}</TableCell>
              <TableCell>{item.qtyAvailable}</TableCell>
              <TableCell>{item.qtyReserved}</TableCell>
              <TableCell>
                {formatDate(item.estimatedReplenishmentDate)}
              </TableCell>
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
