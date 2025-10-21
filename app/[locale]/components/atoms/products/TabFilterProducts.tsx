import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';
import ProductActions from '@atoms/shared/ProductActions';

export type FilterType = 'All' | 'Actives' | 'Archived';

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
          <ProductActions
            selectedProductIds={selectedProductIds}
            isArchived={isArchived}
            onDeleteComplete={onDeleteComplete}
          />
        </div>
      )}
    </div>
  );
}
