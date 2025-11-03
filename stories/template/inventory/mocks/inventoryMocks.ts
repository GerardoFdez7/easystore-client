import {
  FindInventoryDocument,
  FindWarehousesDocument,
  FindWarehouseByIdDocument,
} from '@graphql/generated';

// Mock data for Inventory template stories
export const mockInventoryWarehouses = [
  {
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
        serialNumbers: null,
        productLocation: 'Aisle A-12',
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
      {
        __typename: 'StockPerWarehouse' as const,
        id: 'stock-2',
        warehouseId: 'wh-1',
        qtyAvailable: 75,
        qtyReserved: 10,
        lotNumber: 'LOT-2025-002',
        serialNumbers: null,
        productLocation: 'Aisle B-05',
        estimatedReplenishmentDate: '2025-03-01T00:00:00Z',
        variantId: 'variant-2',
        variantSku: 'SKU-002-BLUE',
        productName: 'Classic Jeans',
        variantFirstAttribute: {
          __typename: 'VariantAttribute' as const,
          key: 'Size',
          value: '32x30',
        },
      },
      {
        __typename: 'StockPerWarehouse' as const,
        id: 'stock-3',
        warehouseId: 'wh-1',
        qtyAvailable: 200,
        qtyReserved: 0,
        lotNumber: 'LOT-2025-003',
        serialNumbers: null,
        productLocation: 'Aisle C-08',
        estimatedReplenishmentDate: null,
        variantId: 'variant-3',
        variantSku: 'SKU-003-BLK',
        productName: 'Running Shoes',
        variantFirstAttribute: {
          __typename: 'VariantAttribute' as const,
          key: 'Size',
          value: '10',
        },
      },
    ],
  },
  {
    __typename: 'Warehouse' as const,
    id: 'wh-2',
    name: 'Distribution Center A',
    createdAt: '2022-11-01T09:00:00Z',
    updatedAt: '2023-04-01T11:00:00Z',
    addressId: 'addr-2',
    addressLine1: '456 Distribution Ave',
    city: 'Commerce Town',
    countryCode: 'US',
    postalCode: '67890',
    stockPerWarehouses: [
      {
        __typename: 'StockPerWarehouse' as const,
        id: 'stock-4',
        warehouseId: 'wh-2',
        qtyAvailable: 300,
        qtyReserved: 50,
        lotNumber: 'LOT-2025-004',
        serialNumbers: null,
        productLocation: 'Section D-15',
        estimatedReplenishmentDate: '2025-01-20T00:00:00Z',
        variantId: 'variant-1',
        variantSku: 'SKU-001-RED',
        productName: 'Premium T-Shirt',
        variantFirstAttribute: {
          __typename: 'VariantAttribute' as const,
          key: 'Color',
          value: 'Red',
        },
      },
      {
        __typename: 'StockPerWarehouse' as const,
        id: 'stock-5',
        warehouseId: 'wh-2',
        qtyAvailable: 120,
        qtyReserved: 15,
        lotNumber: 'LOT-2025-005',
        serialNumbers: null,
        productLocation: 'Section E-22',
        estimatedReplenishmentDate: '2025-02-28T00:00:00Z',
        variantId: 'variant-4',
        variantSku: 'SKU-004-WHT',
        productName: 'Winter Jacket',
        variantFirstAttribute: {
          __typename: 'VariantAttribute' as const,
          key: 'Size',
          value: 'Large',
        },
      },
    ],
  },
  {
    __typename: 'Warehouse' as const,
    id: 'wh-3',
    name: 'Regional Hub B',
    createdAt: '2023-02-01T11:00:00Z',
    updatedAt: '2023-02-01T11:00:00Z',
    addressId: 'addr-3',
    addressLine1: '789 Industrial Road',
    city: 'Chicago',
    countryCode: 'US',
    postalCode: '54321',
    stockPerWarehouses: [
      {
        __typename: 'StockPerWarehouse' as const,
        id: 'stock-6',
        warehouseId: 'wh-3',
        qtyAvailable: 50,
        qtyReserved: 5,
        lotNumber: 'LOT-2025-006',
        serialNumbers: null,
        productLocation: 'Zone F-03',
        estimatedReplenishmentDate: '2025-03-15T00:00:00Z',
        variantId: 'variant-5',
        variantSku: 'SKU-005-GRN',
        productName: 'Summer Dress',
        variantFirstAttribute: {
          __typename: 'VariantAttribute' as const,
          key: 'Size',
          value: 'Medium',
        },
      },
    ],
  },
];

export const mockWarehousesList = [
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
  {
    __typename: 'Warehouse' as const,
    id: 'wh-2',
    name: 'Distribution Center A',
    addressId: 'addr-2',
    addressLine1: '456 Distribution Ave',
    city: 'Commerce Town',
    countryCode: 'US',
    postalCode: '67890',
  },
  {
    __typename: 'Warehouse' as const,
    id: 'wh-3',
    name: 'Regional Hub B',
    addressId: 'addr-3',
    addressLine1: '789 Industrial Road',
    city: 'Chicago',
    countryCode: 'US',
    postalCode: '54321',
  },
];

// GraphQL mock responses
export const mockFindInventoryResponse = {
  data: {
    getAllWarehouses: {
      __typename: 'PaginatedWarehousesType' as const,
      warehouses: mockInventoryWarehouses,
      total: 3,
      hasMore: false,
    },
  },
};

export const mockFindWarehousesResponse = {
  data: {
    getAllWarehouses: {
      __typename: 'PaginatedWarehousesType' as const,
      warehouses: mockWarehousesList,
      total: 3,
      hasMore: false,
    },
  },
};

export const mockFindWarehouseByIdResponse = {
  data: {
    getWarehouseById: mockInventoryWarehouses[0], // Main Warehouse
  },
};

export const mockEmptyInventoryResponse = {
  data: {
    getAllWarehouses: {
      __typename: 'PaginatedWarehousesType' as const,
      warehouses: [],
      total: 0,
      hasMore: false,
    },
  },
};

export const mockEmptyWarehousesResponse = {
  data: {
    getAllWarehouses: {
      __typename: 'PaginatedWarehousesType' as const,
      warehouses: [],
      total: 0,
      hasMore: false,
    },
  },
};

// Mock configurations for Apollo MockedProvider
export const inventoryMocks = [
  {
    request: {
      query: FindInventoryDocument,
      variables: {},
    },
    result: mockFindInventoryResponse,
  },
  {
    request: {
      query: FindWarehousesDocument,
      variables: {
        page: 1,
        limit: 10,
        includeAddresses: true,
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
];

export const emptyInventoryMocks = [
  {
    request: {
      query: FindInventoryDocument,
      variables: {},
    },
    result: mockEmptyInventoryResponse,
  },
  {
    request: {
      query: FindWarehousesDocument,
      variables: {
        page: 1,
        limit: 10,
        includeAddresses: true,
      },
    },
    result: mockEmptyWarehousesResponse,
  },
];
