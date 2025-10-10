import {
  FindInventoryQueryVariables,
  FindInventoryDocument,
  FindInventoryQuery,
  FindWarehouseByIdDocument,
  FindWarehouseByIdQueryVariables,
  FindWarehouseByIdQuery,
  StockPerWarehouseSortBy,
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
type StockDataMaybeWarehouse = StockData & { warehouseId?: string };

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

  // Use general inventory query if no specific warehouse is selected
  const inventoryQuery = useQuery(FindInventoryDocument, {
    variables,
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
      inventoryQuery.data?.getAllWarehouses?.warehouses?.flatMap((warehouse) =>
        (warehouse.stockPerWarehouses || []).map((s) => ({
          ...s,
          // si el backend no retorna warehouseId en el stock, usamos el id del padre
          warehouseId:
            (s as { warehouseId?: string }).warehouseId ?? warehouse.id,
          __warehouseName: warehouse.name,
        })),
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

  const sortBy = variables.stockFilters?.sortBy;
  if (warehouseId && sortBy) {
    const key = (Object.keys(sortBy)[0] ?? '') as keyof StockPerWarehouseSortBy;
    const direction = (key && sortBy[key]) || undefined;

    if (key && direction) {
      processedInventory = [...processedInventory].sort((a, b) => {
        const dir = direction === 'ASC' ? 1 : -1;

        if (key === 'available') {
          return dir * (a.qtyAvailable - b.qtyAvailable);
        }
        if (key === 'reserved') {
          return dir * (a.qtyReserved - b.qtyReserved);
        }
        if (key === 'variantFirstAttribute') {
          const aVal = (a.variantFirstAttribute.value || '').toLowerCase();
          const bVal = (b.variantFirstAttribute.value || '').toLowerCase();
          return dir * aVal.localeCompare(bVal);
        }
        if (key === 'sku') {
          const aVal = (a.variantSku || '').toLowerCase();
          const bVal = (b.variantSku || '').toLowerCase();
          return dir * aVal.localeCompare(bVal);
        }
        if (key === 'replenishmentDate') {
          const aHas = !!a.estimatedReplenishmentDate;
          const bHas = !!b.estimatedReplenishmentDate;
          if (!aHas && !bHas) return 0;
          if (!aHas) return 1;
          if (!bHas) return -1;
          const aTime = new Date(a.estimatedReplenishmentDate).getTime();
          const bTime = new Date(b.estimatedReplenishmentDate).getTime();
          return dir === 1 ? aTime - bTime : bTime - aTime;
        }
        return 0;
      });
    }
  }

  // Get refetch functions from both queries
  const refetch = warehouseId ? warehouseQuery.refetch : inventoryQuery.refetch;

  return {
    inventory: formattedInventory,
    loading,
    error,
    refetch,
  };
};
