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

        // Force cleanup of any Radix UI portals that might be lingering
        setTimeout(() => {
          // Remove any lingering Radix portals/overlays
          const selectors = [
            '[data-slot="alert-dialog-overlay"]',
            '[data-slot="alert-dialog-portal"]',
            '[data-slot="alert-dialog-content"]',
            '[data-radix-portal]',
          ];

          selectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => el.remove());
          });

          // Remove any aria-hidden attributes that might be blocking interactions
          document.body.removeAttribute('aria-hidden');
          document.body.style.pointerEvents = '';

          // Restore focus to body
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          document.body.focus();

          // Navigate after cleanup
          router.back();
        }, 100);
      }
    } catch (_e) {}
  };

  return {
    deleteStock,
    loading,
    error,
  };
}
