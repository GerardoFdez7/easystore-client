'use client';

import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import {
  FindWarehousesDocument,
  type FindWarehousesQuery,
  type FindWarehousesQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

export function useResolveWarehouseId(warehouseName?: string) {
  const apollo = useApolloClient();
  const t = useTranslations('StockDetail');

  return useCallback(
    async (providedId?: string): Promise<string> => {
      if (providedId) return providedId;

      const name = (warehouseName ?? '').trim();
      if (!name)
        throw new Error(
          t('missingWarehouseName') || 'Falta el nombre del almacén',
        );

      const variables: FindWarehousesQueryVariables = {
        page: 1,
        limit: 10,
        name,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
      };

      const res = await apollo.query<
        FindWarehousesQuery,
        FindWarehousesQueryVariables
      >({
        query: FindWarehousesDocument,
        variables,
        fetchPolicy: 'network-only',
      });

      const list = res.data?.getAllWarehouses?.warehouses ?? [];
      const exact = list.filter(
        (w) => (w.name ?? '').toLowerCase() === name.toLowerCase(),
      );

      if (exact.length === 0) {
        throw new Error(`No se encontró almacén con nombre "${name}".`);
      }
      if (exact.length > 1) {
        throw new Error(
          t('warehouseAmbiguous') ||
            `Hay múltiples almacenes con nombre "${name}". Refina el nombre o usa el ID.`,
        );
      }
      return exact[0].id;
    },
    [apollo, warehouseName, t],
  );
}
