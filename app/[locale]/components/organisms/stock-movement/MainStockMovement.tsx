'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Package, Plus } from 'lucide-react';
import StockMovementTable from '@molecules/stock-movement/StockMovementTable';
import StockMovementSkeleton from '@molecules/stock-movement/StockMovementSkeleton';
import EmptyState from '@molecules/shared/EmptyState';

// Stock movement item interface matching the table component
interface StockMovementItem {
  id: string;
  productName: string;
  variantSku?: string;
  deltaQuantity: number;
  reason: string;
  createdBy: string;
  date: string;
}

export default function MainStockMovement() {
  const t = useTranslations('StockMovement');
  const [loading] = useState(false); // This will be replaced with actual data fetching
  const [error] = useState(false); // This will be replaced with actual error handling

  // Mock data - replace with actual data fetching hook
  const mockStockMovements: StockMovementItem[] = [
    {
      id: '1',
      productName: 'iPhone 15 Pro Max',
      variantSku: 'IPH15PM-256-BLK',
      deltaQuantity: -5,
      reason: 'Sale',
      createdBy: 'John Doe',
      date: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      productName: 'Samsung Galaxy S24',
      variantSku: 'SGS24-128-WHT',
      deltaQuantity: 10,
      reason: 'Restock',
      createdBy: 'Jane Smith',
      date: '2024-01-14T14:20:00Z',
    },
    {
      id: '3',
      productName: 'MacBook Air M2',
      variantSku: 'MBA-M2-256-SLV',
      deltaQuantity: 2,
      reason: 'Inventory Count Adjustment',
      createdBy: 'Admin User',
      date: '2024-01-13T09:15:00Z',
    },
  ];

  const handleCreateMovement = () => {
    // TODO: Implement stock movement creation logic
    console.log('Create stock movement clicked');
  };

  if (error) {
    return (
      <EmptyState
        icon={Package}
        title={t('noMovementsTitle')}
        description={t('noMovementsDescription')}
        buttonText={t('createMovement')}
        buttonIcon={Plus}
        onButtonClick={handleCreateMovement}
      />
    );
  }

  return (
    <div className="mx-4 flex w-full max-w-7xl flex-col gap-4 sm:mx-auto">
      {loading ? (
        <StockMovementSkeleton />
      ) : (
        <StockMovementTable
          stockMovements={mockStockMovements}
          onCreateMovement={handleCreateMovement}
        />
      )}
    </div>
  );
}
