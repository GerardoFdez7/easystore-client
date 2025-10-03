import { useTranslations } from 'next-intl';
import { Plus, Warehouse, History } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 md:flex-row md:justify-between">
      <SkeletonWrapper loading={loading}>
        <Button
          variant="outline"
          onClick={() => router.push('/inventory/history')}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" aria-hidden="true" />
          {t('historyButton')}
        </Button>
      </SkeletonWrapper>
      <div className="flex flex-col gap-2 md:flex-row">
        <SkeletonWrapper loading={loading}>
          <Button
            variant="title"
            onClick={onAddStockClick}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t('addStockButton')}
          </Button>
        </SkeletonWrapper>
        <SkeletonWrapper loading={loading}>
          <Button
            variant="title"
            onClick={onManageWarehousesClick}
            className="flex items-center gap-2"
          >
            <Warehouse className="h-4 w-4" aria-hidden="true" />
            {t('manageWarehousesButton')}
          </Button>
        </SkeletonWrapper>
      </div>
    </section>
  );
}
