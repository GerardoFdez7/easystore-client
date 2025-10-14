import {
  FindInventoryQueryVariables,
  FindInventoryDocument,
} from '@graphql/generated';
import { InventoryItem } from '@lib/types/inventory';
import { useQuery } from '@apollo/client/react';

export const useInventoryStorybook = (
  variables: FindInventoryQueryVariables,
  mockInventory?: InventoryItem[],
) => {
  if (mockInventory) {
    return {
      inventory: mockInventory,
      loading: false,
      error: undefined,
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQuery(FindInventoryDocument, {
    variables,
  });

  // Map GraphQL data to InventoryItem format, injecting parent warehouse id/name
  const warehouses = data?.getAllWarehouses?.warehouses ?? [];
  const formattedInventory: InventoryItem[] = warehouses.flatMap((warehouse) =>
    (warehouse.stockPerWarehouses ?? []).map((item) => ({
      id: item.id,
      warehouseId: warehouse.id ?? '',
      warehouseName: warehouse.name ?? undefined,
      variantFirstAttribute: {
        key: item.variantFirstAttribute?.key ?? '',
        value: item.variantFirstAttribute?.value ?? '',
      },
      productName: item.productName ?? '',
      variantSku: item.variantSku ?? '',
      qtyAvailable: item.qtyAvailable ?? 0,
      qtyReserved: item.qtyReserved ?? 0,
      estimatedReplenishmentDate: item.estimatedReplenishmentDate ?? '',
    })),
  );

  return {
    inventory: formattedInventory,
    loading,
    error,
  };
};
