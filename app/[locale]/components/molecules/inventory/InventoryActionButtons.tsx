import { useTranslations } from 'next-intl';
import { Plus, Warehouse, History } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useRouter } from 'next/navigation';

interface InventoryActionButtonsProps {
  loading: boolean;
  onAddStockClick: () => void;
  onManageWarehousesClick: () => void;
}

export default function InventoryActionButtons({
  onAddStockClick,
  onManageWarehousesClick,
}: InventoryActionButtonsProps) {
  const t = useTranslations('Inventory');
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 md:flex-row md:justify-between">
      <Button
        variant="outline"
        onClick={() => router.push('/inventory/history')}
        className="flex w-full items-center gap-2 md:w-auto"
      >
        <History className="h-4 w-4" aria-hidden="true" />
        {t('historyButton')}
      </Button>
      <div className="flex flex-col gap-2 md:flex-row">
        <Button
          variant="title"
          onClick={onAddStockClick}
          className="flex w-full items-center gap-2 md:w-auto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('addStockButton')}
        </Button>
        <Button
          variant="title"
          onClick={onManageWarehousesClick}
          className="flex w-full items-center gap-2 md:w-auto"
        >
          <Warehouse className="h-4 w-4" aria-hidden="true" />
          {t('manageWarehousesButton')}
        </Button>
      </div>
    </section>
  );
}
