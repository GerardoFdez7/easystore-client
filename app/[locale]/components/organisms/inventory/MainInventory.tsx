'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Warehouse, Plus } from 'lucide-react';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventory } from '@hooks/domains/inventory';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';
import EmptyState from '@molecules/shared/EmptyState';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import SearchBar from '@atoms/shared/SearchBar';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';

type SortField = 'available' | 'reserved' | 'date' | 'variantFirstAttribute';
type SortDirection = 'ASC' | 'DESC';

export default function MainInventory() {
  const t = useTranslations('Inventory');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);
  const [isWarehouseManagementOpen, setIsWarehouseManagementOpen] =
    useState(false);
  const [sortField, setSortField] = useState<SortField | null>(
    'variantFirstAttribute',
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  // Variables for the general inventory query (sorting only)
  const variables: FindInventoryQueryVariables = {
    filters: sortField
      ? {
          sortBy: {
            [sortField]: sortDirection,
          },
        }
      : undefined,
  };

  // Debounce the search term for server-side querying
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  const { inventory, loading, error, refetch } = useInventory(
    variables,
    selectedWarehouseId || undefined,
    debouncedSearchTerm,
  );

  // Client-side filtering for responsive, real-time typing feedback
  const filteredInventory = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return inventory;

    return inventory.filter((item) => {
      const productName = (item.productName ?? '').toLowerCase();
      const sku = (item.variantSku ?? '').toLowerCase();
      const attrKey = (item.variantFirstAttribute?.key ?? '').toLowerCase();
      const attrValue = (item.variantFirstAttribute?.value ?? '').toLowerCase();
      const attrCombined = `${attrKey} ${attrValue}`.trim();

      return (
        productName.includes(term) ||
        sku.includes(term) ||
        attrKey.includes(term) ||
        attrValue.includes(term) ||
        attrCombined.includes(term)
      );
    });
  }, [inventory, searchTerm]);

  const handleSortChange = useCallback(
    (field: SortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
      void refetch().catch((_error) => {});
    },
    [refetch],
  );

  const handleCreateStock = useCallback(() => {
    setIsAddStockDialogOpen(true);
  }, []);

  const handleStockAdded = useCallback(() => {
    void refetch().catch((_error) => {});
  }, [refetch]);

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
        placeholder={t('searchPlaceholder')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        className="mb-2"
      />
      <div>
        <SkeletonWrapper loading={loading} fallbackWidth="w-50">
          <WarehouseCombobox
            value={selectedWarehouseId}
            onChange={setSelectedWarehouseId}
          />
        </SkeletonWrapper>
      </div>

      {loading ? (
        <InventoryTableSkeleton />
      ) : (
        <InventoryTable
          variables={variables}
          inventory={filteredInventory}
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
      />
    </main>
  );
}
