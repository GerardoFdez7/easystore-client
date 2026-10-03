import {
  AddressTypeEnum,
  type CreateAddressMutationVariables,
  type CreateWarehouseMutationVariables,
  type FindInventoryQueryVariables,
  type FindWarehousesQuery,
  type UpdateWarehouseMutationVariables,
} from '@graphql/generated';

export const AddressType = AddressTypeEnum;
export type AddressInput = CreateAddressMutationVariables['input'];
export type CreateWarehouseInput = CreateWarehouseMutationVariables['input'];
export type UpdateWarehouseInput = UpdateWarehouseMutationVariables['input'];
export type InventoryQueryVariables = FindInventoryQueryVariables;
export type WarehouseListItem = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

export type InventoryItem = {
  id: string;
  warehouseId: string;
  warehouseName: string;
  variantFirstAttribute: {
    key: string;
    value: string;
  };
  productName: string;
  variantSku: string;
  qtyAvailable: number;
  qtyReserved: number;
  estimatedReplenishmentDate: string;
};

export type SortField =
  | 'available'
  | 'reserved'
  | 'replenishmentDate'
  | 'variantFirstAttribute'
  | 'sku';
