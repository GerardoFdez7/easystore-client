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
import type { SortDirection } from '@lib/types/sort';
import type { SortField } from '@lib/types/inventory';
import {
  Package,
  Plus,
  ClockArrowUp,
  ClockArrowDown,
  MoveUp,
} from 'lucide-react';
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';

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

    // Determine if field is date-based or another
    const isDateField = field === 'replenishmentDate';

    if (isDateField) {
      return sortDirection === 'ASC' ? (
        <>
          <ClockArrowUp aria-hidden="true" className="ml-1 h-4 w-4" />
          <span className="sr-only">{t('ascending')}</span>
        </>
      ) : (
        <>
          <ClockArrowDown aria-hidden="true" className="ml-1 h-4 w-4" />
          <span className="sr-only">{t('descending')}</span>
        </>
      );
    } else {
      return (
        <>
          <MoveUp
            aria-hidden="true"
            className={cn('ml-1 h-4 w-4 transition-transform', {
              'rotate-180': sortDirection === 'DESC',
            })}
          />
          <span className="sr-only">
            {sortDirection === 'ASC' ? t('ascending') : t('descending')}
          </span>
        </>
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
          <TableRow className="hover:bg-background">
            <TableHead className="pl-2">
              <Checkbox
                checked={selectedRows.length === inventory.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('variantFirstAttribute')}
              aria-sort={
                sortField === 'variantFirstAttribute'
                  ? sortDirection === 'ASC'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  handleSort('variantFirstAttribute');
              }}
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
              aria-sort={
                sortField === 'available'
                  ? sortDirection === 'ASC'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSort('available');
              }}
            >
              <div className="flex items-center justify-center">
                {t('availableTableHead')}
                {getSortIcon('available')}
              </div>
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('reserved')}
              aria-sort={
                sortField === 'reserved'
                  ? sortDirection === 'ASC'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSort('reserved');
              }}
            >
              <div className="flex items-center justify-center">
                {t('reservedTableHead')}
                {getSortIcon('reserved')}
              </div>
            </TableHead>
            <TableHead
              className="hover:bg-hover cursor-pointer transition-colors duration-200 select-none"
              onClick={() => handleSort('replenishmentDate')}
              aria-sort={
                sortField === 'replenishmentDate'
                  ? sortDirection === 'ASC'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  handleSort('replenishmentDate');
              }}
            >
              <div className="flex items-center justify-center">
                {t('replenishmentDateTableHead')}
                {getSortIcon('replenishmentDate')}
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
