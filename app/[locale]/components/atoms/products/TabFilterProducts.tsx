import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';
import ProductActions from '@atoms/shared/ProductActions';

export type FilterType = 'All' | 'Actives' | 'Archived';

export type FilterProductsProps = {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  selectedCount: number;
  selectedProductIds: string[];
};

export default function TabFilterProducts({
  selectedFilter,
  setSelectedFilter,
  selectedCount,
  selectedProductIds,
}: FilterProductsProps) {
  const t = useTranslations('Products');

  return (
    <div className="bg-card border-b px-3 py-2">
      <div className="flex items-center gap-2">
        <Tabs
          value={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value as FilterType)}
          className="w-auto flex-shrink-0"
        >
          <TabsList className="bg-card h-auto w-fit justify-start gap-2 sm:gap-4">
            <TabsTrigger
              value="All"
              className="data-[state=active]:border-title text-foreground hover:text-title data-[state=active]:bg-title border-2 px-3 py-1 text-xs font-medium data-[state=active]:text-white sm:text-sm"
            >
              {t('all')}
            </TabsTrigger>
            <TabsTrigger
              value="Actives"
              className="data-[state=active]:border-title text-foreground hover:text-title data-[state=active]:bg-title border-2 px-3 py-1 text-xs font-medium data-[state=active]:text-white sm:text-sm"
            >
              {t('actives')}
            </TabsTrigger>
            <TabsTrigger
              value="Archived"
              className="data-[state=active]:border-title text-foreground hover:text-title data-[state=active]:bg-title border-2 px-3 py-1 text-xs font-medium data-[state=active]:text-white sm:text-sm"
            >
              {t('archived')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {selectedCount > 0 && (
          <div className="mr-2">
            <ProductActions selectedProductIds={selectedProductIds} />
          </div>
        )}
      </div>
    </div>
  );
}
