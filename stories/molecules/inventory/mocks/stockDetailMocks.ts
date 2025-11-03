// Define the variant attribute type
type VariantAttribute = { key: string; value: string };

export const mockStockHeaderData = {
  productName: 'Wireless Bluetooth Headphones',
  sku: 'WBH-001-BLK',
  attributes: [
    { key: 'Color', value: 'Black' },
    { key: 'Connectivity', value: 'Bluetooth 5.0' },
  ] as VariantAttribute[],
  warehouseName: 'Main Warehouse',
};

export const mockStockHeaderMinimal = {
  productName: 'USB Cable',
  sku: 'USB-2M',
  attributes: [] as VariantAttribute[],
  warehouseName: 'Secondary Warehouse',
};

export const mockStockHeaderNoAttributes = {
  productName: 'Laptop Stand',
  sku: 'LS-ADJ-001',
  attributes: [] as VariantAttribute[],
  warehouseName: 'Tech Warehouse',
};

export const mockStockHeaderNoWarehouse = {
  productName: 'Phone Case',
  sku: 'PC-IPH15-BLK',
  attributes: [
    { key: 'Model', value: 'iPhone 15' },
    { key: 'Color', value: 'Black' },
  ] as VariantAttribute[],
};

export const mockStockHeaderOnlySKU = {
  sku: 'TEST-001',
  attributes: [] as VariantAttribute[],
  warehouseName: 'Test Warehouse',
};
