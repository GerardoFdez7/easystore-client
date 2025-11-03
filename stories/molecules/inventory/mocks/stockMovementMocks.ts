// Define the stock movement item type
type StockMovementItem = {
  id: string;
  productName: string;
  variantSku?: string;
  variantFirstAttribute?: { key: string; value: string };
  deltaQuantity: number;
  reason: string;
  createdBy: string;
  date: string;
};

export const mockStockMovements: StockMovementItem[] = [
  {
    id: '1',
    productName: 'Wireless Headphones',
    variantSku: 'WH-001-BLK',
    variantFirstAttribute: { key: 'Color', value: 'Black' },
    deltaQuantity: -5,
    reason: 'Sale through online store - Order #12345',
    createdBy: 'John Doe',
    date: '2025-11-01T10:30:00Z',
  },
  {
    id: '2',
    productName: 'Bluetooth Speaker',
    variantSku: 'BS-002-WHT',
    variantFirstAttribute: { key: 'Color', value: 'White' },
    deltaQuantity: 10,
    reason: 'Restock from supplier - Invoice #INV-2025-001',
    createdBy: 'Jane Smith',
    date: '2025-11-02T14:15:00Z',
  },
  {
    id: '3',
    productName: 'USB Cable',
    variantSku: 'UC-003-2M',
    variantFirstAttribute: { key: 'Length', value: '2m' },
    deltaQuantity: -2,
    reason: 'Damaged item return - Customer refund',
    createdBy: 'Mike Johnson',
    date: '2025-11-03T09:45:00Z',
  },
  {
    id: '4',
    productName: 'Phone Case',
    variantSku: 'PC-004-IPH',
    variantFirstAttribute: { key: 'Model', value: 'iPhone 15' },
    deltaQuantity: 25,
    reason: 'New inventory arrival - Batch #BATCH-2025-010',
    createdBy: 'Sarah Wilson',
    date: '2025-11-03T16:20:00Z',
  },
  {
    id: '5',
    productName: 'Laptop Stand',
    variantSku: 'LS-005-ADJ',
    variantFirstAttribute: { key: 'Type', value: 'Adjustable' },
    deltaQuantity: -1,
    reason: 'Warehouse transfer to secondary location',
    createdBy: 'You',
    date: '2025-11-04T11:00:00Z',
  },
];

export const mockEmptyStockMovements: StockMovementItem[] = [];
