'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Package, Plus } from 'lucide-react';
import EmptyState from '@molecules/shared/EmptyState';
import { useTranslations } from 'next-intl';

type InventoryTableProps = {
  variables: FindInventoryQueryVariables;
  className?: string;
  inventory: InventoryItem[];
  onCreateStock?: () => void;
};

export default function InventoryTable({
  className,
  inventory,
  onCreateStock,
}: InventoryTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const t = useTranslations('Inventory');
  const router = useRouter();

  const handleRowClick = (item: InventoryItem) => {
    // Navigate to stock-detail with the item data as query parameters
    const params = new URLSearchParams({
      id: item.id,
      productName: item.productName,
      variantKey: item.variantFirstAttribute.key,
      variantValue: item.variantFirstAttribute.value,
      variantSku: item.variantSku,
      qtyAvailable: item.qtyAvailable.toString(),
      qtyReserved: item.qtyReserved.toString(),
      estimatedReplenishmentDate: item.estimatedReplenishmentDate,
      productLocation: item.productLocation,
      serialNumbers: item.serialNumbers.toString(),
      lotNumber: item.lotNumber,
    });

    router.push(`/stock-detail?${params.toString()}`);
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
      <div className={cn('w-full', className)}>
        <EmptyState
          icon={Package}
          title={t('noProductVariantsFound')}
          description={t('emptyStateDescription')}
          buttonText={t('addStockButton')}
          buttonIcon={Plus}
          onButtonClick={() => onCreateStock?.()}
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
                checked={selectedRows.length === inventory.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>{t('productTableHead')}</TableHead>
            <TableHead>{t('skuTableHead')}</TableHead>
            <TableHead>{t('availableTableHead')}</TableHead>
            <TableHead>{t('reservedTableHead')}</TableHead>
            <TableHead>{t('replenishmentDateTableHead')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => handleRowClick(item)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
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
