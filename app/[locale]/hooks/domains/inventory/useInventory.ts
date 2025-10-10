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
  searchTerm?: string,
) => {
  // Use warehouse-specific query if warehouseId is provided
  const warehouseQuery = useQuery(FindWarehouseByIdDocument, {
    variables: { id: warehouseId } as FindWarehouseByIdQueryVariables,
    skip: !warehouseId,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
    errorPolicy: 'all',
  });

  // Add search parameter to variables for general inventory query
  const inventoryVariables = {
    ...variables,
    ...(searchTerm && { search: searchTerm }),
  };

  // Use general inventory query if no specific warehouse is selected
  const inventoryQuery = useQuery(FindInventoryDocument, {
    variables: inventoryVariables,
    skip: !!warehouseId,
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
    errorPolicy: 'all',
  });

  // Determine which query to use based on warehouseId
  const { loading, error } = warehouseId ? warehouseQuery : inventoryQuery;

  let inventoryData: StockData[] = [];

  if (warehouseId && warehouseQuery.data) {
    // Handle warehouse-specific data structure
    inventoryData =
      warehouseQuery.data.getWarehouseById?.stockPerWarehouses || [];
  } else if (!warehouseId && inventoryQuery.data) {
    // Handle general inventory data structure
    inventoryData =
      inventoryQuery.data?.getAllWarehouses?.warehouses?.flatMap(
        (warehouse) => warehouse.stockPerWarehouses || [],
      ) || [];
  }

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

  // Get refetch functions from both queries
  const refetch = warehouseId ? warehouseQuery.refetch : inventoryQuery.refetch;

  return {
    inventory: formattedInventory,
    loading,
    error,
    refetch,
  };
};
