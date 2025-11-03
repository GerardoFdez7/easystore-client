'use client';

import { useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  FindWarehouseByIdDocument,
  type FindWarehouseByIdQuery,
  type FindWarehouseByIdQueryVariables,
} from '@graphql/generated';
import type { UseFormReturn } from 'react-hook-form';
import type { StockFormValues } from './useStockFormSchema';

type Options = {
  form: UseFormReturn<StockFormValues>;
  warehouseName?: string;
  warehouseId?: string;
  variantSku?: string;
  setSerialNumbers?: (serials: string[]) => void;
  resolveWarehouseId: (providedId?: string) => Promise<string>;
  onFound?: (ctx: { warehouseId: string; stockId: string }) => void;
};

// Prefill the stock form if an existing stock entry is found for (warehouse, sku)
export function usePrefillExistingStock(opts: Options) {
  const {
    form,
    warehouseName,
    warehouseId,
    variantSku,
    setSerialNumbers,
    resolveWarehouseId,
    onFound,
  } = opts;

  const apollo = useApolloClient();
  const didPrefill = useRef(false);

  useEffect(() => {
    if (didPrefill.current) return; // run once
    if (!variantSku) return;

    const run = async () => {
      try {
        const wid = await resolveWarehouseId(warehouseId);

        const res = await apollo.query<
          FindWarehouseByIdQuery,
          FindWarehouseByIdQueryVariables
        >({
          query: FindWarehouseByIdDocument,
          variables: { id: wid },
          fetchPolicy: 'network-only',
        });

        const stocks = res.data?.getWarehouseById?.stockPerWarehouses ?? [];
        const match = stocks.find(
          (s) =>
            (s.variantSku ?? '').toLowerCase() === variantSku.toLowerCase(),
        );
        if (!match) return;

        // Prefill values into the form
        form.reset({
          available: match.qtyAvailable ?? 0,
          reserved: match.qtyReserved ?? 0,
          productLocation: match.productLocation ?? '',
          lotNumber: match.lotNumber ?? '',
          replenishmentDate: match.estimatedReplenishmentDate
            ? new Date(match.estimatedReplenishmentDate)
            : null,
          reason: '',
        });

        if (Array.isArray(match.serialNumbers) && setSerialNumbers) {
          setSerialNumbers(match.serialNumbers as string[]);
        }

        if (onFound) onFound({ warehouseId: wid, stockId: match.id });

        didPrefill.current = true;
      } catch {
        // Silently ignore; leave form as create defaults
      }
    };

    void run();
  }, [
    apollo,
    warehouseName,
    warehouseId,
    variantSku,
    resolveWarehouseId,
    setSerialNumbers,
    form,
    onFound,
  ]);
}
