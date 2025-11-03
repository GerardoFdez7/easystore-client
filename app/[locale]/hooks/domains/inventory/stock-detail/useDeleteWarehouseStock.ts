'use client';

import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  RemoveStockFromWarehouseDocument,
  type RemoveStockFromWarehouseMutation,
  type RemoveStockFromWarehouseMutationVariables,
} from '@graphql/generated';

export function useDeleteWarehouseStock() {
  const t = useTranslations('StockDetail');
  const router = useRouter();

  const [mutate, { loading, error }] = useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument);

  const deleteStock = async (
    warehouseId: string,
    stockId: string,
    reason?: string,
  ) => {
    try {
      const res = await mutate({
        variables: {
          warehouseId,
          stockId,
          reason: reason || undefined,
        },
      });

      if (res.data?.removeStockFromWarehouse?.id) {
        toast.success(t('deleteSuccess'));
        router.back();
      }
    } catch (_e) {}
  };

  return {
    deleteStock,
    loading,
    error,
  };
}
