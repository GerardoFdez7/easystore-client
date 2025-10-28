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
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';
import { useRouter } from 'next/navigation';
import { isUuidV7 } from '@lib/utils';
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
  const router = useRouter();
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
    const whSlug = (row.warehouseName || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    const sku = row.variantSku;
    router.push(`/inventory/${whSlug}_${sku}`);
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
