'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse } from 'lucide-react';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import StockMovementTable from '@molecules/inventory/stock-movement/StockMovementTable';
import StockMovementSkeleton from '@molecules/inventory/stock-movement/StockMovementSkeleton';
import EmptyState from '@molecules/shared/EmptyState';
import { FindAllMovementsQueryVariables } from '@graphql/generated';
import { useStockMovements } from '@hooks/domains/inventory/stock-movement/useStockMovements';

export default function MainStockMovement() {
  const t = useTranslations('StockMovement');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Variables for the stock movements query
  const variables: FindAllMovementsQueryVariables = {
    warehouseId: selectedWarehouseId || '1', // Default warehouse ID when none selected
    page: currentPage,
    limit: 25,
  };

  const { stockMovements, loading, total } = useStockMovements(
    variables,
    !selectedWarehouseId,
  );

  const totalPages = Math.ceil(total / 25);

  return (
    <div className="flex w-full flex-col gap-4 px-4 xl:mx-auto">
      <WarehouseCombobox
        value={selectedWarehouseId}
        onChange={setSelectedWarehouseId}
        autoSelectFirst
      />

      {loading ? (
        <StockMovementSkeleton />
      ) : stockMovements.length === 0 ? (
        <EmptyState
          icon={Warehouse}
          title={t('noStockTitle')}
          description={t('noStockDescription')}
        />
      ) : (
        <StockMovementTable
          stockMovements={stockMovements}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={total}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
