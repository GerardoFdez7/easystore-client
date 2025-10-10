'use client';

import { useMemo } from 'react';
import { useCreateWarehouseStock as useCreate } from './useCreateWarehouseStock';
import { useUpdateWarehouseStock as useUpdate } from './useUpdateWarehouseStock';
import { usePrefillExistingStock } from './usePrefillExistingStock';
import { useResolveWarehouseId } from './useResolveWarehouseId';
import type { UseFormReturn } from 'react-hook-form';
import type { StockFormValues } from './useStockFormSchema';

type Options = {
  warehouseName?: string;
  variantSku?: string;
  getSerialNumbers?: () => string[];
  reason?: string;
  onSuccess?: (opts: { updatedWarehouseId?: string }) => void;
  form: UseFormReturn<StockFormValues>;
  setSerialNumbers: (serials: string[]) => void;
};

// Hook que decide actualizar si existe stockId o crear si no existe
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

  // corremos el prefill para detectar si existe
  usePrefillExistingStock({
    form,
    warehouseName,
    variantSku,
    setSerialNumbers,
    resolveWarehouseId: resolver,
  });

  // Mutaciones
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

  // Unificamos el submit para: update si hay stockId; create si no
  const handleSubmit = useMemo(() => {
    return async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      // Heurística: si el prefill pobló el formulario con valores distintos a defaults, asumimos edición.
      // Idealmente almacenaríamos stockId/warehouseId al prefill. Aquí lo resolvemos a tiempo real.
      const values = form.getValues();
      const v7 =
        /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/;

      try {
        // Intentamos localizar un stock existente para obtener stockId y warehouseId
        const wid = await resolver(undefined);
        // No tenemos un query directo por SKU->stockId aquí sin otra query; delegamos al backend a través de findWarehouseById
        // pero para mantenerlo simple en esta iteración, si el formulario fue prefilleado (valores no default), lanzamos update con un lookup ligero desde el create hook.
        // Reutilizamos el create hook solo como fuente de selectedVariant (ya está precargado por SKU)
        const stockIdGuess = (
          selectedVariant as unknown as { stockId?: string }
        )?.stockId;

        if (stockIdGuess && v7.test(stockIdGuess)) {
          const ok = await update(wid, stockIdGuess, values, reason);
          if (ok) onSuccess?.({ updatedWarehouseId: wid });
          return;
        }

        // Si no tenemos stockId, caemos al flujo de creación (mantiene compatibilidad)
        createSubmit(e);
      } catch (_err) {
        createSubmit(e);
      }
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
