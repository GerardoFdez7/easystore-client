'use client';

import { useMemo } from 'react';
import { useCreateWarehouseStock as useCreate } from './useCreateWarehouseStock';
import { useUpdateWarehouseStock as useUpdate } from './useUpdateWarehouseStock';
import { usePrefillExistingStock } from './usePrefillExistingStock';
import { useResolveWarehouseId } from './useResolveWarehouseId';
import type { UseFormReturn } from 'react-hook-form';
import type { StockFormValues } from './useStockFormSchema';
import { isUuidV7 } from '@lib/utils';

type Options = {
  warehouseName?: string;
  variantSku?: string;
  getSerialNumbers?: () => string[];
  reason?: string;
  onSuccess?: (opts: { updatedWarehouseId?: string }) => void;
  form: UseFormReturn<StockFormValues>;
  setSerialNumbers: (serials: string[]) => void;
};

export function useUpsertWarehouseStock(opts: Options) {
  const {
    warehouseName,
    variantSku,
    getSerialNumbers,
    reason,
    onSuccess,
    form,
    setSerialNumbers,
  } = opts;

  const resolver = useResolveWarehouseId(warehouseName);

  usePrefillExistingStock({
    form,
    warehouseName,
    variantSku,
    setSerialNumbers,
    resolveWarehouseId: resolver,
  });

  const {
    form: createForm,
    handleSubmit: createSubmit,
    isSubmitting: isCreating,
    selectedVariant,
  } = useCreate({
    warehouseName,
    variantSku,
    getSerialNumbers,
    reason,
    onSuccess,
  });
  const { update, state: updateState } = useUpdate();

  const handleSubmit = useMemo(() => {
    return async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const values = form.getValues();

      try {
        const wid = await resolver(undefined);
        const stockIdGuess = (
          selectedVariant as unknown as { stockId?: string }
        )?.stockId;

        if (stockIdGuess && isUuidV7(stockIdGuess)) {
          const ok = await update(wid, stockIdGuess, values, reason);
          if (ok) onSuccess?.({ updatedWarehouseId: wid });
          return;
        }

        createSubmit(e);
      } catch (_err) {}
    };
  }, [
    form,
    resolver,
    selectedVariant,
    update,
    reason,
    onSuccess,
    createSubmit,
  ]);

  return {
    form: createForm ?? form,
    handleSubmit,
    isSubmitting: isCreating || updateState.loading,
    selectedVariant,
  };
}
