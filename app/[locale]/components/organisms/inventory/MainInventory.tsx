'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';
import EmptyState from '@molecules/shared/EmptyState';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventory } from '@hooks/domains/inventory/useInventory';

export default function MainInventory() {
  const t = useTranslations('Inventory');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);

  // Variables for the general inventory query (when no warehouse is selected)
  const variables: FindInventoryQueryVariables = {};
  const { inventory, loading, error, refetch } = useInventory(
    variables,
    selectedWarehouseId || undefined,
  );

  const handleCreateWarehouse = () => {
    // TODO: Implement warehouse creation logic
    console.log('Create warehouse clicked');
  };

  const handleCreateStock = () => {
    setIsAddStockDialogOpen(true);
  };

  const handleStockAdded = () => {
    // Refetch inventory data after stock is added
    void refetch().catch((_error) => {});
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
    <main className="mx-4 flex w-full max-w-7xl flex-col gap-4 sm:mx-auto">
      <InventoryActionButtons
        loading={loading}
        onAddStockClick={handleCreateStock}
        onManageWarehousesClick={handleCreateWarehouse}
      />
      <SkeletonWrapper loading={loading}>
        <WarehouseCombobox
          width={300}
          value={selectedWarehouseId}
          onChange={setSelectedWarehouseId}
        />
      </SkeletonWrapper>

      {loading ? (
        <InventoryTableSkeleton />
      ) : (
        <InventoryTable
          variables={variables}
          inventory={inventory}
          onCreateStock={handleCreateStock}
        />
      )}
      <AddStockDialog
        open={isAddStockDialogOpen}
        onOpenChange={setIsAddStockDialogOpen}
        onStockAdded={handleStockAdded}
      />
    </main>
  );
}
