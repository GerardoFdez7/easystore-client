import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';

export type FilterType = 'All' | 'Actives' | 'Archived';

export type FilterProductsProps = {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
};

export default function TabFilterProducts({
  selectedFilter,
  setSelectedFilter,
}: FilterProductsProps) {
  const t = useTranslations('Products');

  return (
    <div className="bg-card border-b">
      <Tabs
        value={selectedFilter}
        onValueChange={(value) => setSelectedFilter(value as FilterType)}
      >
        <TabsList className="bg-card h-auto w-fit justify-start gap-2 py-2 pl-3 sm:gap-4">
          <TabsTrigger
            value="All"
            className="data-[state=active]:border-title data-[state=active]:text-title text-foreground hover:text-title data-[state=active]:bg-card border-2 px-3 py-1 text-xs font-medium sm:text-sm"
          >
            {t('all')}
          </TabsTrigger>
          <TabsTrigger
            value="Actives"
            className="data-[state=active]:border-title data-[state=active]:text-title text-foreground hover:text-title data-[state=active]:bg-card border-2 px-3 py-1 text-xs font-medium sm:text-sm"
          >
            {t('actives')}
          </TabsTrigger>
          <TabsTrigger
            value="Archived"
            className="data-[state=active]:border-title data-[state=active]:text-title text-foreground hover:text-title data-[state=active]:bg-card border-2 px-3 py-1 text-xs font-medium sm:text-sm"
          >
            {t('archived')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
