import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import Options, { OptionItem } from '@molecules/shared/Options';
import {
  useMultipleSoftDeleteProducts,
  useMultipleRestoreProducts,
  useMultipleDeleteProducts,
} from '@hooks/domains/products';
import { FilterType } from '@lib/types/filter-mode-mapper';

export type FilterProductsProps = {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  selectedCount: number;
  selectedProductIds: string[];
  isArchived?: boolean | boolean[];
  onDeleteComplete?: () => void;
};

export default function TabFilterProducts({
  selectedFilter,
  setSelectedFilter,
  selectedCount,
  selectedProductIds,
  isArchived = false,
  onDeleteComplete,
}: FilterProductsProps) {
  const t = useTranslations('Products');

  // Hooks for product operations
  const { handleMultipleSoftDelete, loading: archiveLoading } =
    useMultipleSoftDeleteProducts({
      onSuccess: onDeleteComplete,
    });

  const { handleMultipleRestore, loading: restoreLoading } =
    useMultipleRestoreProducts({
      onSuccess: onDeleteComplete,
    });

  const { handleMultipleDelete, loading: deleteLoading } =
    useMultipleDeleteProducts(onDeleteComplete);

  // Determine if products are archived
  const hasArchivedProducts = Array.isArray(isArchived)
    ? isArchived.some((archived) => archived)
    : isArchived;

  const hasActiveProducts = Array.isArray(isArchived)
    ? isArchived.some((archived) => !archived)
    : !isArchived;

  // Create custom options for the Options component
  const customOptions: OptionItem[] = [];

  // Add restore option if there are archived products
  if (hasArchivedProducts) {
    customOptions.push({
      id: 'restore',
      label:
        selectedProductIds.length > 1
          ? t('restoreProducts')
          : t('restoreProduct'),
      icon: RotateCcw,
      onClick: () => {
        void handleMultipleRestore(selectedProductIds, isArchived);
      },
      disabled: restoreLoading,
    });
  }

  // Handle archive operation
  const handleArchive = async () => {
    await handleMultipleSoftDelete(selectedProductIds, isArchived);
  };

  // Handle delete operation
  const handleDelete = async () => {
    await handleMultipleDelete(selectedProductIds);
  };

  return (
    <div className="flex items-center gap-2">
      <Tabs
        value={selectedFilter}
        onValueChange={(value) => setSelectedFilter(value as FilterType)}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full justify-start gap-2 border sm:gap-4">
          <TabsTrigger value="All">{t('all')}</TabsTrigger>
          <TabsTrigger value="Actives">{t('actives')}</TabsTrigger>
          <TabsTrigger value="Archived">{t('archived')}</TabsTrigger>
        </TabsList>
      </Tabs>
      {selectedCount > 0 && (
        <div className="mr-2">
          <Options
            options={customOptions}
            showArchive={hasActiveProducts}
            onArchive={handleArchive}
            archiveTitle={
              selectedProductIds.length > 1
                ? t('archiveProducts')
                : t('archiveProduct')
            }
            archiveDescription={
              selectedProductIds.length > 1
                ? t('archiveDescription')
                : t('archiveDescriptionSingle')
            }
            archiveButtonText={
              selectedProductIds.length > 1
                ? `${t('archive')} (${selectedProductIds.length})`
                : t('archive')
            }
            showDelete={true}
            onDelete={handleDelete}
            deleteTitle={
              selectedProductIds.length > 1
                ? t('deleteProducts')
                : t('deleteProduct')
            }
            deleteDescription={
              selectedProductIds.length > 1
                ? t('deleteDescription')
                : t('deleteDescriptionSingle')
            }
            deleteButtonText={
              selectedProductIds.length > 1
                ? `${t('delete')} (${selectedProductIds.length})`
                : t('delete')
            }
            disabled={archiveLoading || restoreLoading || deleteLoading}
          />
        </div>
      )}
    </div>
  );
}
