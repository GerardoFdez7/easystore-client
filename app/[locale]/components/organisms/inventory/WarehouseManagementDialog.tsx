'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  FindWarehousesQuery,
  CreateWarehouseMutationVariables,
  UpdateWarehouseMutationVariables,
} from '@graphql/generated';
import { useWarehouseManagement } from '@hooks/domains/inventory';
import { Warehouse } from 'lucide-react';
import { Separator } from '@shadcn/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import WarehouseForm from '@molecules/inventory/WarehouseForm';
import WarehouseList from '@organisms/inventory/WarehouseList';

type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

interface WarehouseManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouses?: WarehouseType[];
  loading?: boolean;
  hasMore?: boolean;
}

type DialogMode = 'list' | 'create' | 'edit';

export default function WarehouseManagementDialog({
  open,
  onOpenChange,
  warehouses: initialWarehouses,
  loading: externalLoading,
  hasMore: externalHasMore,
}: WarehouseManagementDialogProps) {
  const t = useTranslations('Inventory.WarehouseManagement');

  // Dialog state
  const [mode, setMode] = useState<DialogMode>('list');
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<WarehouseType | null>(null);

  // Warehouse management hook
  const {
    warehouses: hookWarehouses,
    loading: hookLoading,
    hasMore,
    searchTerm,
    sortBy,
    sortOrder,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    handleLoadMore,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    isCreating,
    isUpdating,
    isDeleting,
  } = useWarehouseManagement();

  const warehouses = initialWarehouses || hookWarehouses;
  const loading = externalLoading ?? hookLoading;
  const hookHasMore = hasMore;
  const hasMoreToUse = externalHasMore ?? hookHasMore;

  // Handlers
  const handleCreateWarehouse = () => {
    setSelectedWarehouse(null);
    setMode('create');
  };

  const handleEditWarehouse = (warehouse: WarehouseType) => {
    setSelectedWarehouse(warehouse);
    setMode('edit');
  };

  const handleDeleteWarehouse = async (warehouseId: string) => {
    await deleteWarehouse(warehouseId);
  };

  const handleWarehouseSubmit = async (
    data:
      | CreateWarehouseMutationVariables['input']
      | UpdateWarehouseMutationVariables['input'],
  ) => {
    if (mode === 'create') {
      // For create mode, ensure we have the required fields for CreateWarehouseInput
      const createData = data as CreateWarehouseMutationVariables['input'];
      const result = await createWarehouse(createData);
      if (result) {
        handleReset(); // Reset to clean state after successful creation
      }
    } else if (mode === 'edit' && selectedWarehouse) {
      // For edit mode, use UpdateWarehouseInput which has optional fields
      const updateData = data as UpdateWarehouseMutationVariables['input'];
      const result = await updateWarehouse(selectedWarehouse.id, updateData);
      if (result) {
        handleReset(); // Reset to clean state after successful update
      }
    }
  };

  const handleCancel = () => {
    setMode('list');
    setSelectedWarehouse(null);
  };

  const handleDialogClose = (open: boolean) => {
    // Only reset mode and selected warehouse when dialog is explicitly closed
    // This preserves user progress when dialog is temporarily hidden
    if (!open) {
      // Don't reset state immediately - let user return to their work
    }
    onOpenChange(open);
  };

  const handleReset = () => {
    // Complete reset of dialog state
    setMode('list');
    setSelectedWarehouse(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-start space-x-2 text-left">
            <Warehouse className="h-5 w-5" />
            <span>
              {mode === 'create'
                ? t('createWarehouse')
                : mode === 'edit'
                  ? t('editWarehouse')
                  : t('warehouseManagement')}
            </span>
          </DialogTitle>
          <DialogDescription className="flex items-start">
            {mode === 'create'
              ? t('createWarehouseDescription')
              : mode === 'edit'
                ? t('editWarehouseDescription')
                : t('warehouseManagementDescription')}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <div className="flex-1 overflow-y-auto">
          {mode === 'list' ? (
            <WarehouseList
              warehouses={warehouses}
              loading={loading}
              hasMore={hasMoreToUse}
              searchTerm={searchTerm}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSearchChange={updateSearchTerm}
              onSortByChange={updateSortBy}
              onSortOrderChange={updateSortOrder}
              onLoadMore={() => void handleLoadMore()}
              onCreateWarehouse={handleCreateWarehouse}
              onEditWarehouse={handleEditWarehouse}
            />
          ) : (
            <WarehouseForm
              warehouse={selectedWarehouse || undefined}
              onSubmit={handleWarehouseSubmit}
              onCancel={handleCancel}
              onDelete={handleDeleteWarehouse}
              isSubmitting={isCreating || isUpdating}
              isDeleting={isDeleting}
              open={false}
              standalone={true}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
