'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import {
  FindInventoryQueryVariables,
  CreateWarehouseMutationVariables,
  UpdateWarehouseMutationVariables,
} from '@graphql/generated';
import type { SortDirection } from '@lib/types/sort';
import type { SortField } from '@lib/types/inventory';
import { useInventory } from '@hooks/domains/inventory';
import { useWarehouseManagement } from '@hooks/domains/inventory';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';
import EmptyState from '@molecules/shared/EmptyState';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import SearchBar from '@atoms/shared/SearchBar';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';
import WarehouseForm from '@molecules/inventory/WarehouseForm';

export default function MainInventory() {
  const t = useTranslations('Inventory');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);
  const [isWarehouseManagementOpen, setIsWarehouseManagementOpen] =
    useState(false);
  const [isWarehouseFormOpen, setIsWarehouseFormOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  // Mapping of UI fields -> backend StockPerWarehouseSortBy
  const serverSortFieldMap: Record<
    SortField,
    'available' | 'reserved' | 'replenishmentDate' | 'variantFirstAttribute'
  > = {
    available: 'available',
    reserved: 'reserved',
    replenishmentDate: 'replenishmentDate',
    variantFirstAttribute: 'variantFirstAttribute',
  };

  // Build variables for general query: sorting + search on server
  const trimmedSearch = searchTerm.trim();
  const sortKey = sortField ? serverSortFieldMap[sortField] : undefined;
  const variables: FindInventoryQueryVariables = {
    stockFilters:
      sortKey || trimmedSearch
        ? {
            ...(trimmedSearch ? { search: trimmedSearch } : {}),
            ...(sortKey ? { sortBy: { [sortKey]: sortDirection } } : {}),
          }
        : undefined,
  };

  const { inventory, loading, error, refetch } = useInventory(
    variables,
    selectedWarehouseId || undefined,
  );

  // Warehouse management for creating the first warehouse
  const { createWarehouse, isCreating } = useWarehouseManagement();
  const handleWarehouseSubmit = async (
    data:
      | CreateWarehouseMutationVariables['input']
      | UpdateWarehouseMutationVariables['input'],
  ) => {
    const result = await createWarehouse(
      data as CreateWarehouseMutationVariables['input'],
    );
    if (result) {
      setIsWarehouseFormOpen(false);
      void refetch().catch((_error) => {});
    }
  };
  // Handle warehouse form cancellation
  const handleWarehouseCancel = () => {
    setIsWarehouseFormOpen(false);
  };

  const handleSortChange = useCallback(
    (field: SortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
    },
    [],
  );

  const handleCreateStock = useCallback(() => {
    setIsAddStockDialogOpen(true);
  }, []);

  const handleStockAdded = useCallback(() => {
    void refetch().catch((_error) => {});
  }, [refetch]);

  // Only show warehouse creation UI for actual "no warehouses" errors
  const isNoWarehousesError =
    error && !error.message?.toLowerCase().includes('no variants found');

  if (isNoWarehousesError) {
    return (
      <>
        <EmptyState
          icon={Warehouse}
          title={t('noWarehousesTitle')}
          description={t('noWarehousesDescription')}
          buttonText={t('createWarehouse')}
          buttonIcon={Plus}
          onButtonClick={() => setIsWarehouseFormOpen(true)}
        />
        <WarehouseForm
          open={isWarehouseFormOpen}
          onOpenChange={setIsWarehouseFormOpen}
          onSubmit={handleWarehouseSubmit}
          onCancel={handleWarehouseCancel}
          isSubmitting={isCreating}
        />
      </>
    );
  }

  return (
    <main className="flex w-full flex-col gap-4 px-4 xl:mx-auto">
      <InventoryActionButtons
        loading={loading}
        onAddStockClick={() => setIsAddStockDialogOpen(true)}
        onManageWarehousesClick={() => setIsWarehouseManagementOpen(true)}
      />
      <SkeletonWrapper loading={loading}>
        <SearchBar
          placeholder={t('searchPlaceholder')}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          className="mb-2"
        />
      </SkeletonWrapper>
      <SkeletonWrapper loading={loading} fallbackWidth="w-50">
        <WarehouseCombobox
          value={selectedWarehouseId}
          onChange={setSelectedWarehouseId}
        />
      </SkeletonWrapper>
      {}
      {loading ? (
        <InventoryTableSkeleton />
      ) : (
        <InventoryTable
          variables={variables}
          inventory={inventory}
          onCreateStock={handleCreateStock}
          onSortChange={handleSortChange}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      )}
      <AddStockDialog
        open={isAddStockDialogOpen}
        onOpenChange={setIsAddStockDialogOpen}
        onStockAdded={handleStockAdded}
      />
      <WarehouseManagementDialog
        open={isWarehouseManagementOpen}
        onOpenChange={setIsWarehouseManagementOpen}
        onLastWarehouseDeleted={() => {
          void refetch().catch((_error) => {});
        }}
      />
    </main>
  );
}
