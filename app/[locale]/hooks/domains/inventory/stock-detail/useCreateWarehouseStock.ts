'use client';

import { useStockForm } from './useStockFormSchema';
import { useVariantPrefetch } from './useVariantPrefetch';
import { useResolveWarehouseId } from './useResolveWarehouseId';
import { useResolveVariantId } from './useResolveVariantId';
import { useCreateStockMutation } from './useCreateStockMutation';

import type { DocumentNode } from 'graphql';
import type { StockFormValues } from './useStockFormSchema';
import { FindWarehouseByIdDocument } from '@graphql/generated';

type CreateStockByLookupOptions = {
  warehouseId?: string;
  warehouseName?: string;

  variantId?: string;
  variantSku?: string;
  productName?: string;
  variantAttributeFilter?: { key: string; value: string };

  getSerialNumbers?: () => string[];
  reason?: string;

  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;

  onSuccess?: (opts: { updatedWarehouseId?: string }) => void;
};

export function useCreateWarehouseStock(opts: CreateStockByLookupOptions = {}) {
  const {
    warehouseId: initialWarehouseId,
    warehouseName,
    variantId: initialVariantId,
    variantSku,
    productName,
    variantAttributeFilter,
    getSerialNumbers,
    reason,
    extraRefetchQueries = [],
    onSuccess,
  } = opts;

  // 1) form
  const { form, t } = useStockForm();

  // 2) variante (UI selector / prefetch)
  const { selectedVariant, selectVariantFromSelector, setSelectedVariant } =
    useVariantPrefetch({
      initialVariantId,
      variantSku,
      productName,
    });

  // 3) resolutores
  const resolveWarehouseId = useResolveWarehouseId(warehouseName);
  const resolveVariantId = useResolveVariantId({
    initialVariantId,
    variantSku,
    productName,
    variantAttributeFilter,
    selectedVariant,
    setSelectedVariant: (v) => setSelectedVariant(v),
  });

  // 4) mutación
  const { mutate, state, notifySuccess, notifyError } = useCreateStockMutation({
    initialWarehouseId,
    extraRefetchQueries,
  });

  // 5) submit
  const _submit = form.handleSubmit(async (values: StockFormValues) => {
    try {
      const [warehouseId, variantId] = await Promise.all([
        resolveWarehouseId(initialWarehouseId),
        resolveVariantId(initialVariantId),
      ]);

      const serials = getSerialNumbers?.() ?? [];

      const input = {
        qtyAvailable: Number(values.available ?? 0),
        qtyReserved: Number(values.reserved ?? 0),
        productLocation: (values.productLocation ?? '').trim() || null,
        lotNumber: (values.lotNumber ?? '').trim() || null,
        serialNumbers: serials.length ? serials : undefined,
        estimatedReplenishmentDate: values.replenishmentDate
          ? values.replenishmentDate.toISOString()
          : null,
      };

      const res = await mutate({
        variables: {
          warehouseId,
          variantId,
          input,
          reason: values.reason ?? reason ?? null,
        },
        // ✅ construimos la lista tipada sin undefineds ni any
        refetchQueries: [
          { query: FindWarehouseByIdDocument, variables: { id: warehouseId } },
          ...extraRefetchQueries,
        ],
      });

      if (res.data?.addStockToWarehouse?.id) {
        notifySuccess();
        onSuccess?.({ updatedWarehouseId: warehouseId });
        form.reset({
          available: 0,
          reserved: 0,
          productLocation: '',
          lotNumber: '',
          replenishmentDate: null,
        });
      } else {
        notifyError();
      }
    } catch (e) {
      const msg =
        (e as { message?: string })?.message ??
        t('createError') ??
        'Error al crear stock';
      notifyError(msg);
    }
  });

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    void _submit();
  };

  return {
    form,
    handleSubmit,
    isSubmitting: state.loading,
    selectedVariant,
    selectVariantFromSelector,
  };
}
