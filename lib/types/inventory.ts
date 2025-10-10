export type InventoryItem = {
  id: string;
  warehouseId: string;
  warehouseName?: string;
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
