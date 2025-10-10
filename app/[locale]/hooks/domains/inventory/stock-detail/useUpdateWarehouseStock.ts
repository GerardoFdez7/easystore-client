'use client';

import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type { DocumentNode } from 'graphql';
import {
  UpdateStockInWarehouseDocument,
  type UpdateStockInWarehouseMutation,
  type UpdateStockInWarehouseMutationVariables,
  FindWarehouseByIdDocument,
} from '@graphql/generated';
import type { StockFormValues } from './useStockFormSchema';

type Options = {
  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;
};

export function useUpdateWarehouseStock(opts: Options = {}) {
  const { extraRefetchQueries = [] } = opts;
  const t = useTranslations('StockDetail');

  const [mutate, state] = useMutation<
    UpdateStockInWarehouseMutation,
    UpdateStockInWarehouseMutationVariables
  >(UpdateStockInWarehouseDocument, {
    awaitRefetchQueries: true,
    errorPolicy: 'all',
  });

  const update = async (
    warehouseId: string,
    stockId: string,
    values: StockFormValues,
    reason?: string,
  ) => {
    const input = {
      qtyAvailable: Number(values.available ?? 0),
      qtyReserved: Number(values.reserved ?? 0),
      productLocation: (values.productLocation ?? '').trim() || null,
      lotNumber: (values.lotNumber ?? '').trim() || null,
      estimatedReplenishmentDate: values.replenishmentDate
        ? values.replenishmentDate.toISOString()
        : null,
    };

    const res = await mutate({
      variables: { warehouseId, stockId, input, reason: reason ?? null },
      refetchQueries: [
        { query: FindWarehouseByIdDocument, variables: { id: warehouseId } },
        ...extraRefetchQueries,
      ],
    });

    if (res.data?.updateStockInWarehouse?.id) {
      toast.success(t('updateSuccess') || 'Stock actualizado exitosamente');
      return true;
    }
    toast.error(t('updateError') || 'Error al actualizar stock');
    return false;
  };

  return { update, state };
}
