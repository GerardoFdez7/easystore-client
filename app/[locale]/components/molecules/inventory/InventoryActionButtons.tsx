import { useTranslations } from 'next-intl';
import { Plus, Warehouse } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';

interface InventoryActionButtonsProps {
  loading: boolean;
  onAddStockClick: () => void;
  onManageWarehousesClick: () => void;
}

export default function InventoryActionButtons({
  loading,
  onAddStockClick,
  onManageWarehousesClick,
}: InventoryActionButtonsProps) {
  const t = useTranslations('Inventory');

  return (
    <div className="flex justify-end gap-2">
      <SkeletonWrapper loading={loading}>
        <Button
          variant="title"
          onClick={onAddStockClick}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('addStockButton')}
        </Button>
      </SkeletonWrapper>
      <SkeletonWrapper loading={loading}>
        <Button
          variant="title"
          onClick={onManageWarehousesClick}
          className="flex items-center gap-2"
        >
          <Warehouse className="h-4 w-4" />
          {t('manageWarehousesButton')}
        </Button>
      </SkeletonWrapper>
    </div>
  );
}
