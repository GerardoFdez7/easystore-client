import type { FindWarehousesQuery } from '@graphql/generated';

export type Warehouse = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][number];

export function mergeWarehousesById(
  existing: unknown[],
  incoming: unknown[],
): Warehouse[] {
  const warehousesById = new Map(
    (existing as Warehouse[]).map((warehouse) => [warehouse.id, warehouse]),
  );

  for (const warehouse of incoming as Warehouse[]) {
    if (!warehousesById.has(warehouse.id)) {
      warehousesById.set(warehouse.id, warehouse);
    }
  }

  return Array.from(warehousesById.values());
}
