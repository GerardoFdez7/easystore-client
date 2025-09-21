import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Button } from '@shadcn/ui/button';
import { Switch } from '@shadcn/ui/switch';
import { Label } from '@shadcn/ui/label';
import { Search, Package, Loader2 } from 'lucide-react';
import ProductVariantGroup from '@molecules/inventory/ProductVariantGroup';
import { useVariantSelector } from '@hooks/domains/inventory';
import EmptyState from '@molecules/shared/EmptyState';
import SortBySelect from '@atoms/shared/SortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import { Skeleton } from '@shadcn/ui/skeleton';
import { SortBy } from '@graphql/generated';
import { useRouter } from 'next/navigation';

interface VariantSelectorProps {
  onVariantSelect: (
    variantId: string,
    productName: string,
    attributes: Array<{ key: string; value: string }>,
  ) => void;
  selectedVariantId?: string;
}

const VariantSelector: FC<VariantSelectorProps> = ({
  onVariantSelect,
  selectedVariantId,
}) => {
  const t = useTranslations('Inventory.AddStock');
  const router = useRouter();

  const {
    searchTerm,
    sortBy,
    sortOrder,
    includeSoftDeleted,
    products,
    loading,
    hasMore,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updateIncludeSoftDeleted,
    handleLoadMore,
  } = useVariantSelector();

  const handleVariantSelect = (
    variantId: string,
    productName: string,
    attributes: Array<{ key: string; value: string }>,
  ) => {
    onVariantSelect(variantId, productName, attributes);
  };

  return (
    <div className="mx-4 space-y-4">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={t('searchProducts')}
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Sort Controls */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <SortBySelect
              value={sortBy}
              onChange={(value) => {
                if (value) {
                  updateSortBy(value);
                }
              }}
              className="w-32"
              availableOptions={[
                SortBy.Name,
                SortBy.CreatedAt,
                SortBy.UpdatedAt,
              ]}
            />

            <SortOrderSelect
              value={sortOrder}
              onChange={(value) => {
                if (value) {
                  updateSortOrder(value);
                }
              }}
              className="w-32"
            />
          </div>

          {/* Include Archived Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="includeSoftDeleted"
              checked={includeSoftDeleted}
              onCheckedChange={updateIncludeSoftDeleted}
            />
            <Label htmlFor="includeSoftDeleted" className="text-sm">
              {t('includeArchived')}
            </Label>
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Package}
            title={t('noVariantsFound')}
            description={t('noVariantsFoundDescription')}
            buttonText={t('viewProducts')}
            onButtonClick={() => router.push('/products')}
          />
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductVariantGroup
                key={product.name}
                productName={product.name}
                variants={product.variants}
                onVariantSelect={handleVariantSelect}
                selectedVariantId={selectedVariantId}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && products.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                handleLoadMore().catch((err) => {
                  console.error('Error loading more products:', err);
                });
              }}
              disabled={loading}
              className="min-w-32"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                t('loadMore')
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

VariantSelector.displayName = 'VariantSelector';

export default VariantSelector;
