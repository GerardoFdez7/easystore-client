'use client';

import { useState } from 'react';
import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { formatDate } from '@lib/utils';
import {
  FindInventoryQueryVariables,
  StockPerWarehouseSortBy,
} from '@graphql/generated';
import { InventoryItem } from '@lib/types/inventory';
import type { SortDirection } from '@lib/types/sort';
import { Package, Plus, ClockArrowUp, ClockArrowDown } from 'lucide-react';
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';
import TablePagination from '@molecules/shared/TablePagination';
import SortableHeader from '@atoms/shared/SortableHeader';

type InventoryTableProps = {
  variables: FindInventoryQueryVariables;
  className?: string;
  inventory: InventoryItem[];
  onCreateStock?: () => void;
  onSortChange?: (
    field: keyof StockPerWarehouseSortBy,
    direction: SortDirection,
  ) => void;
  sortField?: keyof StockPerWarehouseSortBy | null;
  sortDirection?: SortDirection;
};

export default function InventoryTable({
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

  const handleSort = (field: keyof StockPerWarehouseSortBy) => {
    let newDirection: SortDirection = 'ASC';

    if (sortField === field) {
      newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }

    onSortChange?.(field, newDirection);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? currentItems.map((item) => item.id) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
    );
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="pl-2">
              <Checkbox
                checked={
                  selectedRows.length === currentItems.length &&
                  currentItems.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <SortableHeader<keyof StockPerWarehouseSortBy>
              sortKey="variantFirstAttribute"
              currentSortBy={sortField}
              currentSortOrder={sortDirection}
              onSort={handleSort}
            >
              {t('productTableHead')}
            </SortableHeader>
            <SortableHeader<keyof StockPerWarehouseSortBy>
              sortKey="sku"
              currentSortBy={sortField}
              currentSortOrder={sortDirection}
              onSort={handleSort}
            >
              {t('skuTableHead')}
            </SortableHeader>
            <SortableHeader<keyof StockPerWarehouseSortBy>
              sortKey="available"
              currentSortBy={sortField}
              currentSortOrder={sortDirection}
              onSort={handleSort}
            >
              {t('availableTableHead')}
            </SortableHeader>
            <SortableHeader<keyof StockPerWarehouseSortBy>
              sortKey="reserved"
              currentSortBy={sortField}
              currentSortOrder={sortDirection}
              onSort={handleSort}
            >
              {t('reservedTableHead')}
            </SortableHeader>
            <SortableHeader<keyof StockPerWarehouseSortBy>
              sortKey="replenishmentDate"
              currentSortBy={sortField}
              currentSortOrder={sortDirection}
              onSort={handleSort}
              icon={sortDirection === 'ASC' ? ClockArrowUp : ClockArrowDown}
              disableRotation
            >
              {t('replenishmentDateTableHead')}
            </SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id} className="group cursor-pointer">
              <TableCell
                className="group-hover:bg-background cursor-default"
                onClick={handleCheckboxClick}
              >
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
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCount={selectedRows.length}
        totalRows={inventory.length}
        onPageChange={(page) => {
          setCurrentPage(page);
          setSelectedRows([]); // Clear selection when changing pages
        }}
        onPreviousPage={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSelectedRows([]);
          }
        }}
        onNextPage={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setSelectedRows([]);
          }
        }}
        onFirstPage={() => {
          setCurrentPage(1);
          setSelectedRows([]);
        }}
        onLastPage={() => {
          setCurrentPage(totalPages);
          setSelectedRows([]);
        }}
        canPreviousPage={currentPage > 1}
        canNextPage={currentPage < totalPages}
      />
    </>
  );
}
