'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import StockMovementTable from '@molecules/inventory/stock-movement/StockMovementTable';
import StockMovementSkeleton from '@molecules/inventory/stock-movement/StockMovementSkeleton';
import EmptyState from '@molecules/shared/EmptyState';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import { FindAllMovementsQueryVariables } from '@graphql/generated';
import { useStockMovements } from '@hooks/domains/inventory/stock-movement/useStockMovements';

export default function MainStockMovement() {
  const t = useTranslations('StockMovement');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');

  // Variables for the stock movements query
  const variables: FindAllMovementsQueryVariables = {
    warehouseId: selectedWarehouseId || '1', // Default warehouse ID when none selected
    page: 1,
    limit: 50,
  };

  const { stockMovements, loading, error } = useStockMovements(
    variables,
    !selectedWarehouseId,
  );

  const handleCreateWarehouse = () => {
    // TODO: Implement warehouse creation logic
    console.log('Create warehouse clicked');
  };

  if (error) {
    return (
      <EmptyState
        icon={Warehouse}
        title={t('noWarehousesTitle')}
        description={t('noWarehousesDescription')}
        buttonText={t('createWarehouse')}
        buttonIcon={Plus}
        onButtonClick={handleCreateWarehouse}
      />
    );
  }

  return (
    <div className="mx-4 flex w-full max-w-7xl flex-col gap-4 xl:mx-auto">
      <SkeletonWrapper loading={loading}>
        <WarehouseCombobox
          value={selectedWarehouseId}
          onChange={setSelectedWarehouseId}
          autoSelectFirst
        />
      </SkeletonWrapper>

      {loading ? (
        <StockMovementSkeleton />
      ) : stockMovements.length === 0 ? (
        <EmptyState
          icon={Warehouse}
          title={t('noStockTitle')}
          description={t('noStockDescription')}
        />
      ) : (
        <StockMovementTable stockMovements={stockMovements} />
      )}
    </div>
  );
}
