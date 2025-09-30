'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventory } from '@hooks/domains/inventory/useInventory';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';
import EmptyState from '@molecules/shared/EmptyState';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';

export default function MainInventory() {
  const t = useTranslations('Inventory');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);
  const [isWarehouseManagementOpen, setIsWarehouseManagementOpen] =
    useState(false);

  // Variables for the general inventory query (when no warehouse is selected)
  const variables: FindInventoryQueryVariables = {};
  const { inventory, loading, error, refetch } = useInventory(
    variables,
    selectedWarehouseId || undefined,
  );

  if (error) {
    return (
      <>
        <EmptyState
          icon={Warehouse}
          title={t('noWarehousesTitle')}
          description={t('noWarehousesDescription')}
          buttonText={t('createWarehouse')}
          buttonIcon={Plus}
          onButtonClick={() => setIsWarehouseManagementOpen(true)}
        />
        <WarehouseManagementDialog
          open={isWarehouseManagementOpen}
          onOpenChange={setIsWarehouseManagementOpen}
        />
      </>
    );
  }

  return (
    <main className="mx-4 flex w-full max-w-7xl flex-col gap-4 xl:mx-auto">
      <InventoryActionButtons
        loading={loading}
        onAddStockClick={() => setIsAddStockDialogOpen(true)}
        onManageWarehousesClick={() => setIsWarehouseManagementOpen(true)}
      />
      <SkeletonWrapper loading={loading} fallbackWidth="w-50">
        <WarehouseCombobox
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
          onCreateStock={() => setIsAddStockDialogOpen(true)}
        />
      )}
      <AddStockDialog
        open={isAddStockDialogOpen}
        onOpenChange={setIsAddStockDialogOpen}
        onStockAdded={() => {
          void refetch().catch((_error) => {});
        }}
      />
      <WarehouseManagementDialog
        open={isWarehouseManagementOpen}
        onOpenChange={setIsWarehouseManagementOpen}
      />
    </main>
  );
}
