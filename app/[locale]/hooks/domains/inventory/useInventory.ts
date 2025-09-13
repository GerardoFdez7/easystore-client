import {
  FindInventoryQueryVariables,
  FindInventoryDocument,
} from '@graphql/generated';
import { InventoryItem } from '@molecules/inventory/InventoryTable';
import { useSuspenseQuery } from '@apollo/client/react';

export const useInventory = (variables: FindInventoryQueryVariables) => {
  const { data } = useSuspenseQuery(FindInventoryDocument, {
    variables,
  });

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
  };
};
