'use client';

import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  RemoveStockFromWarehouseDocument,
  type RemoveStockFromWarehouseMutation,
  type RemoveStockFromWarehouseMutationVariables,
} from '@graphql/generated';

type DeleteStockOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useDeleteWarehouseStock(opts: DeleteStockOptions = {}) {
  const t = useTranslations('StockDetail');
  const { onSuccess } = opts;

  const [mutate, { loading, error }] = useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument);

  const deleteStock = async (
    warehouseId: string,
    stockId: string,
    reason?: string,
  ): Promise<boolean> => {
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
        onSuccess?.();
        return true;
      }
      return false;
    } catch (_e) {
      return false;
    }
  };

  return {
    deleteStock,
    loading,
    error,
  };
}
