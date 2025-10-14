import { InventoryItem } from '@lib/types/inventory';

export const generateMockInventoryData = (count: number): InventoryItem[] => {
  const mockInventoryTableData: InventoryItem[] = [];
  for (let i = 1; i <= count; i++) {
    mockInventoryTableData.push({
      id: String(i),
      warehouseId: `wh-${(i % 5) + 1}`,
      warehouseName:
        ['Main', 'East', 'West', 'North', 'South'][i % 5] + ' Warehouse',
      variantFirstAttribute: {
        key: i % 2 === 0 ? 'Color' : 'Size',
        value:
          i % 2 === 0
            ? i % 4 === 0
              ? 'Red'
              : 'Blue'
            : i % 3 === 0
              ? 'Small'
              : 'Large',
      },
      productName: `Product ${i}`,
      variantSku: `SKU${String(i).padStart(3, '0')}`,
      qtyAvailable: Math.floor(Math.random() * 100) + 1,
      qtyReserved: Math.floor(Math.random() * 20),
      estimatedReplenishmentDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    });
  }
  return mockInventoryTableData;
};

export const mockInventoryTableData = generateMockInventoryData(100);
