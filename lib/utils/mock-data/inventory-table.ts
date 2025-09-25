import { InventoryItem } from '@lib/types/inventory';

export const generateMockInventoryData = (count: number): InventoryItem[] => {
  const mockInventoryTableData: InventoryItem[] = [];
  for (let i = 1; i <= count; i++) {
    mockInventoryTableData.push({
      id: String(i),
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
      qtyAvailable: Math.floor(Math.random() * 200) + 50,
      qtyReserved: Math.floor(Math.random() * 40) + 10,
      estimatedReplenishmentDate: `2024-0${Math.floor(Math.random() * 9) + 1}-0${Math.floor(Math.random() * 9) + 1}`,
    });
  }
  return mockInventoryTableData;
};

export const mockInventoryTableData = generateMockInventoryData(100);
