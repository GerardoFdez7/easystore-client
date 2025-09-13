import {
  FindInventoryQueryVariables,
  FindInventoryDocument,
} from '@graphql/generated';
import { InventoryItem } from '@molecules/inventory/InventoryTable';
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
    sku: item.variantSku ?? '',
    available: item.qtyAvailable ?? 0,
    reserved: item.qtyReserved ?? 0,
    replenishmentDate: item.estimatedReplenishmentDate ?? '',
  }));

  return {
    inventory: formattedInventory,
    loading,
    error,
  };
};
