export type InventoryItem = {
  id: string;
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
  | 'variantFirstAttribute';
