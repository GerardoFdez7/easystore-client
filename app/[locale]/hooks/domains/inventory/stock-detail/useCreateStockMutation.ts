'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { DocumentNode } from 'graphql';
import {
  AddStockToWarehouseDocument,
  type AddStockToWarehouseMutation,
  type AddStockToWarehouseMutationVariables,
  FindWarehouseByIdDocument,
} from '@graphql/generated';

type Options = {
  initialWarehouseId?: string;
  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;
};

export function useCreateStockMutation(opts: Options) {
  const { initialWarehouseId, extraRefetchQueries = [] } = opts;
  const t = useTranslations('StockDetail');

  const [mutate, state] = useMutation<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >(AddStockToWarehouseDocument, {
    refetchQueries: [
      ...(initialWarehouseId
        ? [
            {
              query: FindWarehouseByIdDocument,
              variables: { id: initialWarehouseId },
            },
          ]
        : []),
      ...extraRefetchQueries,
    ],
    awaitRefetchQueries: true,
    errorPolicy: 'all',
  });

  const notifySuccess = () =>
    toast.success(t('createSuccess') || 'Stock creado exitosamente');
  const notifyError = (msg?: string) =>
    toast.error(msg ?? t('createError') ?? 'Error al crear stock');

  return { mutate, state, notifySuccess, notifyError };
}
