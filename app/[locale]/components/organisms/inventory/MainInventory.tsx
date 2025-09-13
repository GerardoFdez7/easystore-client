'use client';

import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import InventoryTable from '@molecules/inventory/InventoryTable';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventory } from '@hooks/domains/inventory/useInventory';

const variables: FindInventoryQueryVariables = {};

export default function MainInventory() {
  const { inventory } = useInventory(variables);

  return (
    <div className="mx-4 flex w-full max-w-7xl flex-col gap-4 sm:mx-auto">
      <WarehouseCombobox />
      <InventoryTable variables={variables} inventory={inventory} />
    </div>
  );
}
