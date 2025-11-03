import {
  FindInventoryQueryVariables,
  FindInventoryDocument,
  FindInventoryQuery,
  FindWarehouseByIdDocument,
  FindWarehouseByIdQueryVariables,
  FindWarehouseByIdQuery,
} from '@graphql/generated';
import { InventoryItem } from '@lib/types/inventory';
import { useQuery } from '@apollo/client/react';

// Type for the stock data from both queries
type StockData =
  | NonNullable<
      FindWarehouseByIdQuery['getWarehouseById']
    >['stockPerWarehouses'][0]
  | NonNullable<
      FindInventoryQuery['getAllWarehouses']['warehouses'][0]
    >['stockPerWarehouses'][0];

export const useInventory = (
  variables: FindInventoryQueryVariables,
  warehouseId?: string,
) => {
  // Use warehouse-specific query if warehouseId is provided
  const warehouseQuery = useQuery(FindWarehouseByIdDocument, {
    variables: { id: warehouseId } as FindWarehouseByIdQueryVariables,
    skip: !warehouseId,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
    errorPolicy: 'all',
  });

  const inventoryQuery = useQuery(FindInventoryDocument, {
    variables,
    skip: !!warehouseId,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const loading = warehouseId ? warehouseQuery.loading : inventoryQuery.loading;
  const error = warehouseId ? warehouseQuery.error : inventoryQuery.error;

  let inventoryData: Array<StockData & { warehouseName: string }> = [];

  if (warehouseId && warehouseQuery.data) {
    // Handle warehouse-specific data structure
    const warehouse = warehouseQuery.data.getWarehouseById;
    const warehouseName = warehouse?.name ?? '';
    inventoryData =
      warehouse?.stockPerWarehouses.map((stock) => ({
        ...stock,
        warehouseName,
      })) || [];
  } else if (!warehouseId && inventoryQuery.data) {
    const warehouses = inventoryQuery.data.getAllWarehouses?.warehouses || [];
    inventoryData = warehouses.flatMap((w) =>
      (w.stockPerWarehouses || []).map((stock) => ({
        ...stock,
        warehouseName: w.name,
      })),
    );
  }

  const formattedInventory: InventoryItem[] = inventoryData.map((item) => ({
    id: item.id,
    warehouseId: item.warehouseId,
    warehouseName: item.warehouseName,
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

  let processedInventory = formattedInventory;

  const search = variables.stockFilters?.search?.toLowerCase();
  if (warehouseId && search) {
    processedInventory = processedInventory.filter((item) => {
      const haystack = [
        item.productName,
        item.variantSku,
        item.variantFirstAttribute.key,
        item.variantFirstAttribute.value,
      ]
        .filter(Boolean)
        .map((s) => s.toLowerCase());
      return haystack.some((s) => s.includes(search));
    });
  }

  // Get refetch functions from both queries
  const refetch = warehouseId ? warehouseQuery.refetch : inventoryQuery.refetch;

  return {
    inventory: processedInventory,
    loading,
    error,
    refetch,
  };
};
