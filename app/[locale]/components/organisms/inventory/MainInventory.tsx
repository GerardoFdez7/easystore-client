'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventory } from '@hooks/domains/inventory';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';
import EmptyState from '@molecules/shared/EmptyState';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';
import { useRouter } from 'next/navigation';
import { isUuidV7 } from '@lib/utils';
import { buildInventoryPath } from '@lib/utils/path';
import { useMutation } from '@apollo/client/react';
import {
  RemoveStockFromWarehouseDocument,
  type RemoveStockFromWarehouseMutation,
  type RemoveStockFromWarehouseMutationVariables,
  FindWarehouseByIdDocument,
} from '@graphql/generated';
import { toast } from 'sonner';

export default function MainInventory() {
  const t = useTranslations('Inventory');
  const tProduct = useTranslations('Products');
  const router = useRouter();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);
  const [isWarehouseManagementOpen, setIsWarehouseManagementOpen] =
    useState(false);
  const [isWarehouseFormOpen, setIsWarehouseFormOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  // Mapping of UI fields -> backend StockPerWarehouseSortBy
  const serverSortFieldMap: Record<
    SortField,
    | 'available'
    | 'reserved'
    | 'replenishmentDate'
    | 'variantFirstAttribute'
    | 'sku'
  > = {
    available: 'available',
    reserved: 'reserved',
    replenishmentDate: 'replenishmentDate',
    variantFirstAttribute: 'variantFirstAttribute',
    sku: 'sku',
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

  const [removeStock] = useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument, {
    awaitRefetchQueries: true,
    errorPolicy: 'all',
  });

  const handleEdit = (row: {
    warehouseName?: string;
    warehouseId: string;
    variantSku: string;
  }) => {
    router.push(buildInventoryPath(row.warehouseName || '', row.variantSku));
  };

  const handleDelete = async (row: { id: string; warehouseId: string }) => {
    try {
      if (!isUuidV7(row.id) || !isUuidV7(row.warehouseId)) {
        toast.error(
          t('errorDeletingStock', {
            default: 'Failed to delete stock',
          } as Record<string, string | number | Date>),
        );
        return;
      }
      await removeStock({
        variables: { warehouseId: row.warehouseId, stockId: row.id },
        refetchQueries: selectedWarehouseId
          ? [
              {
                query: FindWarehouseByIdDocument,
                variables: { id: selectedWarehouseId },
              },
            ]
          : undefined,
      });
      toast.success(
        t('stockDeletedSuccessfully', {
          default: 'Stock deleted',
        } as Record<string, string | number | Date>) || 'Stock deleted',
      );
      await refetch();
    } catch (_e) {
      toast.error(
        t('errorDeletingStock', {
          default: 'Failed to delete stock',
        } as Record<string, string | number | Date>) ||
          'Failed to delete stock',
      );
    }
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
      <SearchBar
        placeholder={tProduct('searchProducts')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        className="mb-2"
      />
      <WarehouseCombobox
        value={selectedWarehouseId}
        onChange={setSelectedWarehouseId}
      />
      {}
      {loading ? (
        <InventoryTableSkeleton />
      ) : (
        <InventoryTable
          variables={variables}
          inventory={inventory}
          onCreateStock={() => setIsAddStockDialogOpen(true)}
          onEditRow={handleEdit}
          onDeleteRow={(row) => {
            void handleDelete(row);
          }}
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
