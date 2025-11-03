import {
  FindWarehousesDocument,
  FindWarehouseByIdDocument,
  AddStockToWarehouseDocument,
  UpdateStockInWarehouseDocument,
  RemoveStockFromWarehouseDocument,
} from '@graphql/generated';

// Mock data for StockDetail template stories
export const mockStockDetailWarehouse = {
  __typename: 'Warehouse' as const,
  id: 'wh-1',
  name: 'Main Warehouse',
  createdAt: '2023-01-15T10:00:00Z',
  updatedAt: '2023-03-20T14:30:00Z',
  addressId: 'addr-1',
  addressLine1: '123 Storage Street',
  city: 'Warehouse City',
  countryCode: 'US',
  postalCode: '12345',
  stockPerWarehouses: [
    {
      __typename: 'StockPerWarehouse' as const,
      id: 'stock-1',
      warehouseId: 'wh-1',
      qtyAvailable: 150,
      qtyReserved: 25,
      lotNumber: 'LOT-2025-001',
      serialNumbers: ['SN001', 'SN002', 'SN003'],
      productLocation: 'Aisle A-12, Shelf 3',
      estimatedReplenishmentDate: '2025-02-15T00:00:00Z',
      variantId: 'variant-1',
      variantSku: 'SKU-001-RED',
      productName: 'Premium T-Shirt',
      variantFirstAttribute: {
        __typename: 'VariantAttribute' as const,
        key: 'Color',
        value: 'Red',
      },
    },
  ],
};

export const mockEmptyWarehouse = {
  __typename: 'Warehouse' as const,
  id: 'wh-1',
  name: 'Main Warehouse',
  createdAt: '2023-01-15T10:00:00Z',
  updatedAt: '2023-03-20T14:30:00Z',
  addressId: 'addr-1',
  addressLine1: '123 Storage Street',
  city: 'Warehouse City',
  countryCode: 'US',
  postalCode: '12345',
  stockPerWarehouses: [],
};

export const mockWarehousesForLookup = [
  {
    __typename: 'Warehouse' as const,
    id: 'wh-1',
    name: 'Main Warehouse',
    addressId: 'addr-1',
    addressLine1: '123 Storage Street',
    city: 'Warehouse City',
    countryCode: 'US',
    postalCode: '12345',
  },
];

// GraphQL mock responses
export const mockFindWarehousesResponse = {
  data: {
    getAllWarehouses: {
      __typename: 'PaginatedWarehousesType' as const,
      warehouses: mockWarehousesForLookup,
      total: 1,
      hasMore: false,
    },
  },
};

export const mockFindWarehouseByIdResponse = {
  data: {
    getWarehouseById: mockStockDetailWarehouse,
  },
};

export const mockFindEmptyWarehouseByIdResponse = {
  data: {
    getWarehouseById: mockEmptyWarehouse,
  },
};

export const mockAddStockToWarehouseResponse = {
  data: {
    addStockToWarehouse: {
      __typename: 'StockPerWarehouse' as const,
      id: 'new-stock-id',
      warehouseId: 'wh-1',
      qtyAvailable: 100,
      qtyReserved: 0,
      lotNumber: 'LOT-2025-NEW',
      serialNumbers: [],
      productLocation: 'New Location',
      estimatedReplenishmentDate: null,
      variantId: 'variant-1',
      variantSku: 'SKU-001-RED',
      productName: 'Premium T-Shirt',
      variantFirstAttribute: {
        __typename: 'VariantAttribute' as const,
        key: 'Color',
        value: 'Red',
      },
    },
  },
};

export const mockUpdateStockInWarehouseResponse = {
  data: {
    updateStockInWarehouse: {
      __typename: 'StockPerWarehouse' as const,
      id: 'stock-1',
      warehouseId: 'wh-1',
      qtyAvailable: 200,
      qtyReserved: 50,
      lotNumber: 'LOT-2025-UPDATED',
      serialNumbers: ['SN001', 'SN002'],
      productLocation: 'Updated Location',
      estimatedReplenishmentDate: '2025-03-01T00:00:00Z',
      variantId: 'variant-1',
      variantSku: 'SKU-001-RED',
      productName: 'Premium T-Shirt',
      variantFirstAttribute: {
        __typename: 'VariantAttribute' as const,
        key: 'Color',
        value: 'Red',
      },
    },
  },
};

export const mockDeleteStockFromWarehouseResponse = {
  data: {
    removeStockFromWarehouse: {
      __typename: 'StockPerWarehouse' as const,
      id: 'stock-1',
    },
  },
};

// Mock configurations for Apollo MockedProvider
export const stockDetailMocks = [
  {
    request: {
      query: FindWarehousesDocument,
      variables: {
        page: 1,
        limit: 25,
        name: 'Main Warehouse',
        sortBy: 'NAME',
        sortOrder: 'ASC',
      },
    },
    result: mockFindWarehousesResponse,
  },
  {
    request: {
      query: FindWarehouseByIdDocument,
      variables: { id: 'wh-1' },
    },
    result: mockFindWarehouseByIdResponse,
  },
  {
    request: {
      query: AddStockToWarehouseDocument,
    },
    result: mockAddStockToWarehouseResponse,
  },
  {
    request: {
      query: UpdateStockInWarehouseDocument,
    },
    result: mockUpdateStockInWarehouseResponse,
  },
  {
    request: {
      query: RemoveStockFromWarehouseDocument,
    },
    result: mockDeleteStockFromWarehouseResponse,
  },
];

export const emptyStockDetailMocks = [
  {
    request: {
      query: FindWarehousesDocument,
      variables: {
        page: 1,
        limit: 25,
        name: 'Main Warehouse',
        sortBy: 'NAME',
        sortOrder: 'ASC',
      },
    },
    result: mockFindWarehousesResponse,
  },
  {
    request: {
      query: FindWarehouseByIdDocument,
      variables: { id: 'wh-1' },
    },
    result: mockFindEmptyWarehouseByIdResponse,
  },
];
