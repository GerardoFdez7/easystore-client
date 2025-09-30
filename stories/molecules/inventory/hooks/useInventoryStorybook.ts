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

  // Map GraphQL data to InventoryItem format
  const inventoryData =
    data?.getAllWarehouses?.warehouses?.flatMap(
      (warehouse) => warehouse.stockPerWarehouses || [],
    ) || [];

  const formattedInventory: InventoryItem[] = inventoryData.map((item) => ({
    id: item.id,
    variantFirstAttribute: {
      key: item.variantFirstAttribute?.key ?? '',
      value: item.variantFirstAttribute?.value ?? '',
    },
    productName: item.productName ?? '',
    variantSku: item.variantSku ?? '',
    qtyAvailable: item.qtyAvailable ?? 0,
    qtyReserved: item.qtyReserved ?? 0,
    estimatedReplenishmentDate: item.estimatedReplenishmentDate ?? '',
  }));

  return {
    inventory: formattedInventory,
    loading,
    error,
  };
};
