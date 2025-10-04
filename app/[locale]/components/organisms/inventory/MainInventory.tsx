'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import {
  FindInventoryQueryVariables,
  CreateWarehouseMutationVariables,
  UpdateWarehouseMutationVariables,
} from '@graphql/generated';
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

type SortField = 'available' | 'reserved' | 'date' | 'variantFirstAttribute';
type SortDirection = 'ASC' | 'DESC';

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

  // Variables for the general inventory query
  const variables: FindInventoryQueryVariables = {
    filters: sortField
      ? {
          sortBy: {
            [sortField]: sortDirection,
          },
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

  // Refetch data when searchTerm or sortField changes (automatic search)
  useEffect(() => {
    const updatedVariables: FindInventoryQueryVariables = {
      name: searchTerm || undefined,
      filters: sortField
        ? {
            sortBy: {
              [sortField]: sortDirection,
            },
          }
        : undefined,
    };
    void refetch(updatedVariables).catch((_error) => {});
  }, [searchTerm, sortField, sortDirection, refetch]);

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);

    // Refetch data with new sorting
    void refetch().catch((_error) => {});
  };

  if (error) {
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
      <SearchBar
        placeholder={t('searchPlaceholder')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        className="mb-2"
      />
      <SkeletonWrapper loading={loading} fallbackWidth="sm:w-70 w-40">
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
          inventory={filteredInventory}
          onCreateStock={() => setIsAddStockDialogOpen(true)}
          onSortChange={handleSortChange}
          sortField={sortField}
          sortDirection={sortDirection}
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
        onLastWarehouseDeleted={() => {
          void refetch().catch((_error) => {});
        }}
      />
    </main>
  );
}
